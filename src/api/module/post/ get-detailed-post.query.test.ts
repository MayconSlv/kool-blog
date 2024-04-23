import { afterEach, before, describe, it } from 'mocha'
import Container from 'typedi'
import chai, { expect } from 'chai'
import chaiExclude from 'chai-exclude'
import { DetailedPostModel, PostModel } from '@domain/model'
import { CommentEntity, PostEntity, UserEntity } from '@data/db/entity'
import { createComment, createPost, createUser, MakeRequest, Query, Repositories, TestServer } from '@test'

type Response = { getPost: DetailedPostModel }
chai.use(chaiExclude)

describe('GraphQL - Get all posts - Query', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let users: UserEntity[]
  let posts: PostEntity[]
  let comments: CommentEntity[]

  const query = Query.getDetailedPost

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    users = await repositories.user.save([createUser(), createUser({ username: 'seconduser', name: 'Second User' })])
    comments = [
      { content: 'haha nice!' },
      { content: 'wow' },
      { content: 'yes' },
      { content: 'nooo' },
      { content: 'poggers' },
    ].map((comment) => createComment({ content: comment.content, user: users[1] }))
    comments = await repositories.comment.save(comments)

    posts = await repositories.post.save([
      createPost({ user: users[0], comments }),
      createPost({ user: users[0], content: 'post without comment' }),
    ])
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should show details of a specific post', async () => {
    const response = await makeRequest.post<Response>(query, { postId: posts[0].id })

    const postResponse = response.body.data.getPost
    checkDetailedPost(postResponse, posts[0])
  })

  it('should return a empty list if the post does not have comments', async () => {
    const response = await makeRequest.post<Response>(query, { postId: posts[1].id })

    const postResponse = response.body.data.getPost
    const commentsResponse = postResponse.comments
    expect(commentsResponse).to.be.deep.eq([])
    checkDetailedPost(postResponse, posts[1])
  })

  it('should return a return a not found error if the post does not exist', async () => {
    const response = await makeRequest.post<Response>(query, { postId: '000' })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('Not found error')
  })

  function checkDetailedPost(response: DetailedPostModel, entity: PostEntity) {
    expect(response)
      .excluding('comments')
      .to.be.deep.eq({
        id: entity.id,
        content: entity.content,
        user: {
          id: entity.user.id,
          username: entity.user.username,
          name: entity.user.name,
          email: entity.user.email,
        },
      })

    response.comments.forEach((comment) => {
      const commentDb = entity.comments.find((item) => item.id === comment.id)!
      expect(comment).to.be.deep.eq({
        id: commentDb.id,
        content: commentDb.content,
        user: {
          name: commentDb.user.name,
          username: commentDb.user.username,
        },
      })
    })
  }
})
