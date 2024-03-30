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

type Response = { createComment: CommentModel }

describe.only('GraphQL - Create a comment - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let postDb: PostEntity
  let userDb: UserEntity
  let commentDb: CommentEntity[]

  const mutation = Mutation.createComment

  const input = {
    content: 'que post bacana',
    postId: 'a28f9275-1ac4-4052-b77a-4807836e1435',
    username: 'johndoe',
  }

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    postDb = await repositories.post.save(createPost())
    userDb = await repositories.user.save(createUser())
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should be able to comment in a post correctly', async () => {
    const response = await makeRequest.post<Response>(mutation, {
      input: {
        ...input,
        postId: postDb.id,
      },
    })

    const commentResponse = response.body.data.createComment
    const commentDb = await repositories.comment.findOneOrFail({ where: { post: { id: postDb.id } } })
    console.log(postDb)
    checkComment(commentResponse, commentDb)
  })

  function checkComment(response: CommentModel, entity: CommentEntity) {
    expect(response).to.be.deep.eq({ id: entity.id, content: entity.content })
  }
})
