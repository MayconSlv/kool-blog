import { afterEach, before, describe, it } from 'mocha'
import Container from 'typedi'
import { expect } from 'chai'
import { PostModel } from '@domain/model'
import { PostEntity, UserEntity } from '@data/db/entity'
import { createPost, createUser, MakeRequest, Mutation, Query, Repositories, TestServer } from '@test'
import { authenticateUser } from '@test/authenticate-user.test'

type Response = { updatePost: PostModel }

describe('GraphQL - Update a post - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let user: UserEntity
  let postsDb: PostEntity[]
  let token: string

  const query = Mutation.updatePost

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    user = await repositories.user.save(createUser())
    token = authenticateUser(user)
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

    const response = await makeRequest.post<Response>(query, { input }, 200, { authorization: `Bearer ${token}` })
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
      id: '000',
      content: 'Post content after update',
    }

    const response = await makeRequest.post<Response>(query, { input }, 200, { authorization: `Bearer ${token}` })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('Not found error')
  })

  it('should return a unauthorized error if the token is invalid', async () => {
    const input = {
      id: postsDb[0].id,
      content: 'Post content after update',
    }

    const response = await makeRequest.post<Response>(query, { input }, 200, { authorization: `Bearer invalid-token` })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('invalid token')
  })
})
