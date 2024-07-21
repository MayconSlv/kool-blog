import { afterEach, before, describe, it } from 'mocha'
import Container from 'typedi'
import { expect } from 'chai'
import {
  createPermission,
  createPost,
  createRole,
  createRolePermission,
  createUser,
  createUserRole,
  MakeRequest,
  Mutation,
  Repositories,
  TestServer,
} from '@test'
import { PermissionEntity, PostEntity, RoleEntity, UserEntity } from '@data/db/entity'
import { authenticateUser } from '@test/authenticate-user.test'
import { Roles } from '@domain/model'

type Response = { deletePost: string }

describe('GraphQL - Delete a post - Query', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let user: UserEntity
  let role: RoleEntity
  let permission: PermissionEntity
  let posts: PostEntity[]
  let token: string

  const query = Mutation.deletePost

  before(async () => {
    makeRequest = new MakeRequest()
    testServer = new TestServer()
    repositories = Container.get(Repositories)

    await testServer.start()
  })

  beforeEach(async () => {
    user = await repositories.user.save(createUser())
    role = await repositories.role.save(createRole({ name: Roles.user }))
    permission = await repositories.permission.save(createPermission({ name: 'delete' }))

    await repositories.userRole.save(createUserRole({ user, role }))
    await repositories.rolePermission.save(createRolePermission({ role, permission }))
    posts = await repositories.post.save([createPost({ user }), createPost({ user })])
    token = authenticateUser(user)
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should be able remove a post correctly', async () => {
    const response = await makeRequest.post<Response>(query, { postId: posts[0].id }, 200, {
      authorization: `Bearer ${token}`,
    })

    const postResponse = response.body.data.deletePost
    expect(postResponse).to.be.deep.eq(posts[0].id)
  })

  it('should return a not found error if pass a wrong ID', async () => {
    const response = await makeRequest.post<Response>(query, { postId: '000' }, 200, {
      authorization: `Bearer ${token}`,
    })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('Not found error')
  })

  it('should return a unauthorized error if is using an invalid token', async () => {
    const response = await makeRequest.post<Response>(query, { postId: posts[0].id }, 200, {
      authorization: 'Bearer invalid-token',
    })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('invalid token')
  })
})
