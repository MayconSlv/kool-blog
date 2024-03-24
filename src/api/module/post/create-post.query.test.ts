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

  const input = {
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting 
      industry. Lorem Ipsum has been the industry's standard dummy text 
      ever since the 1500s, when an unknown printer took a galley of type 
      and scrambled it to make a type specimen book.`,
    username: 'johndoe',
  }

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
    const response = await makeRequest.post<Response>(mutation, { input })

    const postResponse = response.body.data
    expect(postResponse?.createPost)
      .to.have.property('content')
      .that.is.eq(input.content)
  })

  it('shoult not be able to create a post using a username not saved in the database', async () => {
    const response = await makeRequest.post(mutation, {
      input: {
        ...input,
        username: 'userNotSaved',
      },
    })

    expect(response.body.errors[0])
      .to.have.property('message')
      .that.is.eq('User not found.')
  })
})
