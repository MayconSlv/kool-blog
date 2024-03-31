import { afterEach, before, describe, it } from 'mocha'
import { Repositories } from '@test/repositories.test'
import Container from 'typedi'
import { MakeRequest } from '@test/make-request.test'
import { TestServer } from '@test/test-server.test'
import { Mutation } from '@test/mutation.test'
import { expect } from 'chai'
import { CommentEntity, PostEntity, UserEntity } from '@data/db/entity'
import { createComment, createPost, createUser } from '@test'

type Response = { deleteComment: string }

describe('GraphQL - Delete a comment - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let postDb: PostEntity
  let userDb: UserEntity
  let comments: CommentEntity[]

  const mutation = Mutation.deleteComment

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
      { content: 'Parabéns pelo conteúdo. Aprendi algo novo hoje!' },
      { content: 'Obrigado por compartilhar. Isso me ajudou bastante.' },
    ].map((comment) => createComment({ content: comment.content, user: userDb, post: postDb }))
    await repositories.comment.save(comments)
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should remove a comment from a post correctly', async () => {
    const response = await makeRequest.post<Response>(mutation, {
      commentId: comments[0].id,
    })

    const deletedCommentId = response.body.data.deleteComment
    const commentsDb = await repositories.comment.find()
    expect(deletedCommentId).to.be.deep.eq(comments[0].id)
    expect(commentsDb).to.have.lengthOf(4)
  })

  it('should not be able to delete a comment with a invalid ID', async () => {
    const invalidID = '123e4567-e89b-12d3-a456-426614174000'

    const response = await makeRequest.post<Response>(mutation, {
      commentId: invalidID,
    })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('not found error')
  })
})
