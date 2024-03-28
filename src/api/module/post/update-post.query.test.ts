import { afterEach, before, describe, it } from 'mocha'
import Container from 'typedi'
import { expect } from 'chai'
import { PostModel } from '@domain/model'
import { PostEntity, UserEntity } from '@data/db/entity'
import {
  createPost,
  createUser,
  MakeRequest,
  Mutation,
  Query,
  Repositories,
  TestServer,
} from '@test'

type Response = { updatePost: PostModel }

describe('GraphQL - Update a post - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let user: UserEntity
  let postsDb: PostEntity[]

  const query = Mutation.updatePost

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    user = await repositories.user.save(createUser())
    postsDb = await repositories.post.save([
      createPost({ user, content: 'Post content before update' }),
      createPost({ user }),
    ])
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should be able update a post correctly', async () => {
    const input = {
      id: postsDb[0].id,
      content: 'Post content after update',
    }

    const response = await makeRequest.post<Response>(query, { input })
    const updatedPostResponse = response.body.data.updatePost
    const updatedPostDb = await repositories.post.findOneOrFail({
      where: { id: updatedPostResponse.id },
    })
    expect(updatedPostResponse).to.be.deep.eq({
      id: updatedPostDb.id,
      content: updatedPostDb.content,
    })
  })

  it('should return a not found error if the ID is wrong', async () => {
    const input = {
      id: 'f1b539a0-9f44-4f22-aebe-936c499ed9ff',
      content: 'Post content after update',
    }

    const response = await makeRequest.post<Response>(query, { input })
    expect(response.body.errors[0])
      .to.have.property('message')
      .that.is.eq('Not found error')
  })
})
