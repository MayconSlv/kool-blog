import { afterEach, before, describe, it } from 'mocha'
import Container from 'typedi'
import { expect } from 'chai'
import { PostModel, Roles } from '@domain/model'
import { PermissionEntity, PostEntity, RoleEntity, UserEntity } from '@data/db/entity'
import {
  createPermission,
  createPost,
  createRole,
  createRolePermission,
  createUser,
  createUserRole,
  MakeRequest,
  Query,
  Repositories,
  TestServer,
} from '@test'

type Response = { getPosts: PostModel[] }

describe('GraphQL - Get all posts - Query', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let user: UserEntity
  let role: RoleEntity
  let permission: PermissionEntity
  let postsDb: PostEntity[]

  const query = Query.getPosts

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
    postsDb = await repositories.post.save([createPost({ user }), createPost({ user })])
  })

  afterEach(async () => {
    await repositories.clear()
  })

  after(async () => {
    await testServer.stop()
  })

  it('should be able to fetch all posts', async () => {
    const response = await makeRequest.post<Response>(query)

    const postsResponse = response.body.data.getPosts
    checkPosts(postsResponse, postsDb)
  })

  it('should return an empty list if there are no posts registered in the database', async () => {
    await repositories.clear()

    const response = await makeRequest.post<Response>(query)

    const postsResponse = response.body.data.getPosts
    expect(postsResponse).to.be.deep.eq([])
  })

  function checkPosts(response: PostModel[], entities: PostEntity[]) {
    response.forEach((post) => {
      const postDb = entities.find((item) => item.content === post.content)
      expect(post).to.have.property('content').that.is.eq(postDb?.content)
      expect(post).to.have.property('user').that.is.eq(post.user)
    })
  }
})
