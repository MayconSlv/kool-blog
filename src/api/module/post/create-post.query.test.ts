import { afterEach, before, describe, it } from 'mocha'
import Container from 'typedi'
import { expect } from 'chai'
import { PostModel } from '@domain/model'
import {
  createUser,
  MakeRequest,
  Mutation,
  Repositories,
  TestServer,
} from '@test'

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

    const postRes = response.body.data.createPost
    const postDb = await repositories.post.findOneOrFail({
      where: { id: postRes.id },
    })
    expect(postRes.content).to.be.eq(postDb.content)
    expect(postRes.id).to.be.deep.eq(postDb.id)
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
