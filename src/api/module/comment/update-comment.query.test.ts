import { afterEach, before, describe, it } from 'mocha'
import { Repositories } from '@test/repositories.test'
import Container from 'typedi'
import { MakeRequest } from '@test/make-request.test'
import { TestServer } from '@test/test-server.test'
import { Mutation } from '@test/mutation.test'
import { expect } from 'chai'
import { CommentEntity, PostEntity, UserEntity } from '@data/db/entity'
import { createComment, createPost, createUser } from '@test'
import { CommentModel } from '@domain/model/comment.model'
import { checkComment } from '@test/checker.test'
import { authenticateUser } from '@test/authenticate-user.test'

type Response = { updateComment: CommentModel }

describe('GraphQL - Update a comment - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let postDb: PostEntity
  let usersDb: UserEntity[]
  let comments: CommentEntity[]
  let token: string
  let tokenNd: string

  const mutation = Mutation.updateComment

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    usersDb = await repositories.user.save([createUser(), createUser()])
    postDb = await repositories.post.save(createPost({ user: usersDb[0] }))
    token = authenticateUser(usersDb[0])
    tokenNd = authenticateUser(usersDb[1])

    comments = [
      { content: 'Excelente post! Muito informativo.' },
      { content: 'Adorei ler isso. Ótimo trabalho!' },
      { content: 'Que interessante! Nunca tinha pensado nisso antes.' },
    ].map((comment) => createComment({ content: comment.content, user: usersDb[0], post: postDb }))
    await repositories.comment.save(comments)
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should update a comment correctly', async () => {
    const response = await makeRequest.post<Response>(
      mutation,
      {
        input: {
          id: comments[0].id,
          content: 'Excelente post!',
        },
      },
      200,
      { authorization: `Bearer ${token}` },
    )

    const updatedComment = response.body.data.updateComment
    const updatedCommentDb = await repositories.comment.findOneOrFail({ where: { id: updatedComment.id } })
    checkComment(updatedComment, updatedCommentDb)
  })

  it('should return a not found error if the post does not exist in database', async () => {
    const response = await makeRequest.post<Response>(
      mutation,
      {
        input: {
          id: '4123e849-1175-49d8-a3f6-f338bab4ff33',
          content: 'Excelente post!',
        },
      },
      200,
      { authorization: `Bearer ${token}` },
    )

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('Not found error')
  })

  it('should not be able to update another users comment', async () => {
    const response = await makeRequest.post<Response>(
      mutation,
      {
        input: {
          id: comments[0].id,
          content: 'Excelente post!',
        },
      },
      200,
      { authorization: `Bearer ${tokenNd}` },
    )

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('unauthorized')
  })

  it('should return a unauthorized error if user is using a invalid token', async () => {
    const response = await makeRequest.post<Response>(
      mutation,
      {
        input: {
          id: comments[0].id,
          content: 'Excelente post!',
        },
      },
      200,
      { authorization: `Bearer invaid-token` },
    )

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('invalid token')
  })
})
