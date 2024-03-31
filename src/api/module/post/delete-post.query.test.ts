import { afterEach, before, describe, it } from 'mocha'
import Container from 'typedi'
import { expect } from 'chai'
import { createPost, createUser, MakeRequest, Mutation, Repositories, TestServer } from '@test'
import { PostEntity, UserEntity } from '@data/db/entity'

type Response = { deletePost: string }

describe('GraphQL - Get all posts - Query', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let user: UserEntity
  let postsDb: PostEntity[]

  const query = Mutation.deletePost

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    user = await repositories.user.save(createUser())
    postsDb = await repositories.post.save([createPost({ user, content: 'post to delete' }), createPost({ user })])
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should be able remove a post correctly', async () => {
    const response = await makeRequest.post<Response>(query, {
      postId: postsDb[0].id,
    })

    const postResponse = response.body.data.deletePost
    expect(postResponse).to.be.deep.eq(postsDb[0].id)
  })

  it('should return a not found error if pass a wrong ID', async () => {
    const invalidUuid = '4123e849-1175-49d8-a3f6-f338bab4ff33'

    const response = await makeRequest.post<Response>(query, {
      postId: invalidUuid,
    })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('Not found error')
  })
})
