import { afterEach, before, describe, it } from 'mocha'
import { Repositories } from '@test/repositories.test'
import Container from 'typedi'
import { MakeRequest } from '@test/make-request.test'
import { TestServer } from '@test/test-server.test'
import { Mutation } from '@test/mutation.test'
import { expect } from 'chai'
import { PostModel } from '@domain/model'
import { createUser } from '@test/entity.seed.test'

type Response = { createPost: PostModel }

describe('GraphQL - Create a post - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  const mutation = Mutation.createPost

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    await repositories.user.save(createUser())
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should be able to create a user correctly', async () => {
    const response = await makeRequest.post<Response>(mutation)

    const postResponse = response.body.data
    expect(postResponse?.createPost).to.have.property('content')
  })
})
