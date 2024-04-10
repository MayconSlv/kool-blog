import { afterEach, before, describe, it } from 'mocha'
import { Repositories } from '@test/repositories.test'
import Container from 'typedi'
import { MakeRequest } from '@test/make-request.test'
import { TestServer } from '@test/test-server.test'
import { Mutation } from '@test/mutation.test'
import { UserModel } from '@domain/model'
import { expect } from 'chai'
import { CommentEntity, PostEntity, UserEntity } from '@data/db/entity'
import { createPost, createUser } from '@test'
import { CommentModel } from '@domain/model/comment.model'
import { checkComment } from '@test/checker.test'
import { authenticateUser } from '@test/authenticate-user.test'

type Response = { createComment: CommentModel }

describe('GraphQL - Create a comment - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let postDb: PostEntity
  let userDb: UserEntity
  let token: string

  const mutation = Mutation.createComment

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    userDb = await repositories.user.save(createUser())
    postDb = await repositories.post.save(createPost({ user: userDb }))
    token = authenticateUser(userDb)
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should be able to comment in a post correctly', async () => {
    const input = {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      postId: postDb.id,
    }

    const response = await makeRequest.post<Response>(mutation, { input }, 200, { authorization: `Bearer ${token}` })

    const commentResponse = response.body.data.createComment
    const commentDb = await repositories.comment.findOneOrFail({ where: { post: { id: postDb.id } } })
    checkComment(commentResponse, commentDb)
  })

  it('should return a unauthorized error if user is using a invalid token', async () => {
    const input = {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      postId: postDb.id,
    }

    const response = await makeRequest.post<Response>(mutation, { input }, 200, {
      authorization: `Bearer invalid-token`,
    })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('invalid token')
  })
})
