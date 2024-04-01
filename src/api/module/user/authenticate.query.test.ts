import { afterEach, before, describe, it } from 'mocha'
import { Repositories } from '@test/repositories.test'
import Container from 'typedi'
import { MakeRequest } from '@test/make-request.test'
import { TestServer } from '@test/test-server.test'
import { Mutation } from '@test/mutation.test'
import { AuthenticatedUserModel } from '@domain/model'
import { expect } from 'chai'
import { UserEntity } from '@data/db/entity'
import { createUser } from '@test'
import { hash } from 'bcryptjs'
import { checkUser } from '@test/checker.test'

type Response = { signIn: AuthenticatedUserModel }

describe('GraphQL - Authenticate a user - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let user: UserEntity

  const mutation = Mutation.authenticate

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    user = await repositories.user.save(
      createUser({ username: 'john123', email: 'john@email.com', passwordHash: await hash('123456', 6) }),
    )
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should be able to sign using username correctly', async () => {
    const response = await makeRequest.post<Response>(mutation, {
      input: {
        usernameOrEmail: 'john123',
        password: '123456',
      },
    })

    const authenticatedUserResponse = response.body.data.signIn
    expect(authenticatedUserResponse).to.have.property('token').that.is.a('string')
    checkUser(authenticatedUserResponse.user, user)
  })

  it('should be able to sign using email correctly', async () => {
    const response = await makeRequest.post<Response>(mutation, {
      input: {
        usernameOrEmail: 'john@email.com',
        password: '123456',
      },
    })

    const authenticatedUserResponse = response.body.data.signIn
    expect(authenticatedUserResponse).to.have.property('token').that.is.a('string')
    checkUser(authenticatedUserResponse.user, user)
  })

  it('should return invalid credentials error if using a wrong email or username', async () => {
    const response = await makeRequest.post<Response>(mutation, {
      input: {
        usernameOrEmail: 'wrong-email-or-username',
        password: '123456',
      },
    })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('invalid credentials error')
  })

  it('should return invalid credentials error if using a wrong password', async () => {
    const response = await makeRequest.post<Response>(mutation, {
      input: {
        usernameOrEmail: 'john@email.com',
        password: 'wrong-password',
      },
    })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('invalid credentials error')
  })
})
