import { afterEach, before, describe, it } from 'mocha'
import { Repositories } from '@test/repositories.test'
import Container from 'typedi'
import { MakeRequest } from '@test/make-request.test'
import { TestServer } from '@test/test-server.test'
import { Mutation } from '@test/mutation.test'
import { UserModel } from '@domain/model'
import { expect } from 'chai'

type Response = { createUser: UserModel }

describe('GraphQL - Create a user - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  const mutation = Mutation.createUser

  const input = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@email.com',
    password: '123456',
    birthDate: '01/01/2001',
  }

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should be able to create a user correctly', async () => {
    const response = await makeRequest.post<Response>(mutation, { input })

    const userResponse = response.body.data?.createUser
    expect(userResponse).to.have.property('name').that.is.eq(input.name)
    expect(userResponse).to.have.property('username').that.is.eq(input.username)
    expect(userResponse).to.have.property('email').that.is.eq(input.email)
  })

  it('should not create a user using a registered email', async () => {
    await makeRequest.post<Response>(mutation, { input })

    const response = await makeRequest.post<Response>(mutation, { input })
    expect(response.body.errors[0])
      .to.have.property('message')
      .that.is.eq('email already exists.')
  })

  it('should not be able to register a user with an invalid email', async () => {
    const response = await makeRequest.post<Response>(mutation, {
      input: {
        ...input,
        email: 'invalidemail',
      },
    })
    expect(response.body.errors[0])
      .to.have.property('message')
      .that.is.eq('Argument Validation Error')
  })
})
