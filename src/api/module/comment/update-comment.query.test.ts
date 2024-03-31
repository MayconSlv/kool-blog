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

type Response = { updateComment: CommentModel }

describe('GraphQL - Update a comment - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let postDb: PostEntity
  let userDb: UserEntity
  let comments: CommentEntity[]

  const mutation = Mutation.updateComment

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    userDb = await repositories.user.save(createUser())
    postDb = await repositories.post.save(createPost({ user: userDb }))

    comments = [
      { content: 'Excelente post! Muito informativo.' },
      { content: 'Adorei ler isso. Ótimo trabalho!' },
      { content: 'Que interessante! Nunca tinha pensado nisso antes.' },
    ].map((comment) => createComment({ content: comment.content, user: userDb, post: postDb }))
    await repositories.comment.save(comments)
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should update a comment correctly', async () => {
    const response = await makeRequest.post<Response>(mutation, {
      input: {
        id: comments[0].id,
        content: 'Excelente post!',
      },
    })

    const updatedComment = response.body.data.updateComment
    const updatedCommentDb = await repositories.comment.findOneOrFail({ where: { id: updatedComment.id } })
    checkComment(updatedComment, updatedCommentDb)
  })
})
