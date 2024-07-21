import { afterEach, before, describe, it } from 'mocha'
import Container from 'typedi'
import { expect } from 'chai'
import { PostModel, Roles } from '@domain/model'
import {
  createPermission,
  createRole,
  createRolePermission,
  createUser,
  createUserRole,
  MakeRequest,
  Mutation,
  Repositories,
  TestServer,
} from '@test'
import { PermissionEntity, RoleEntity, RolePermissionsEntity, UserEntity, UserRolesEntity } from '@data/db/entity'
import { authenticateUser } from '@test/authenticate-user.test'

type Response = { createPost: PostModel }

describe('GraphQL - Create a post - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  const mutation = Mutation.createPost

  let token: string
  let user: UserEntity
  let role: RoleEntity
  let permission: PermissionEntity

  const input = {
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting 
      industry. Lorem Ipsum has been the industry's standard dummy text 
      ever since the 1500s, when an unknown printer took a galley of type 
      and scrambled it to make a type specimen book.`,
  }

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    user = await repositories.user.save(createUser())
    role = await repositories.role.save(createRole({ name: Roles.user }))
    permission = await repositories.permission.save(createPermission({ name: 'create' }))

    await repositories.userRole.save(createUserRole({ user, role }))
    await repositories.rolePermission.save(createRolePermission({ role, permission }))

    token = authenticateUser(user)
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should be able to create a post correctly', async () => {
    const response = await makeRequest.post<Response>(mutation, { input }, 200, { authorization: `Bearer ${token}` })

    const postResponse = response.body.data.createPost
    const postDatabase = await repositories.post.findOne({ where: { id: postResponse.id } })
    expect(postResponse).to.be.deep.eq({ content: postDatabase?.content, id: postDatabase?.id })
  })

  it('should not be able to create a post with a unauthorized user', async () => {
    const response = await makeRequest.post(mutation, { input }, 200, { authorization: 'Bearer invalid-token' })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('invalid token')
  })
})
