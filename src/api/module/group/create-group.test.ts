import { PermissionEntity, RoleEntity, UserEntity } from '@data/db/entity'
import { CreatedGroupModel, CreateGroupInputModel, Roles } from '@domain/model'
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
import { authenticateUser } from '@test/authenticate-user.test'
import { expect } from 'chai'
import { describe } from 'mocha'
import Container from 'typedi'

type Response = { createGroup: CreatedGroupModel }

describe('GraphQL - Create Group - Mutation', async () => {
  let makeRequest: MakeRequest
  let testServer: TestServer
  let repositories: Repositories

  let token: string
  let user: UserEntity
  let role: RoleEntity
  let permission: PermissionEntity

  const mutation = Mutation.createGroup

  const input = {
    description: 'Test group description',
    name: 'John Doe Group',
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

  it('should be able to create a group correctly', async () => {
    const response = await makeRequest.post<Response>(mutation, { input }, 200, { authorization: `Bearer ${token}` })

    const groupResponse = response.body.data.createGroup
    const groupDatabase = await repositories.group.findOneOrFail({ where: { id: groupResponse.id } })

    expect(groupResponse).to.be.deep.eq({
      id: groupDatabase.id,
      name: groupDatabase.name,
      description: groupDatabase.description,
      group_creator: groupDatabase.group_creator,
    })
    expect(groupResponse).to.be.deep.eq({
      id: groupDatabase.id,
      name: input.name,
      description: input.description,
      group_creator: user.id,
    })
  })

  it('a same user should be able to create more then one group', async () => {
    const [firstResponse, secondResponse] = await Promise.all([
      await makeRequest.post<Response>(mutation, { input }, 200, { authorization: `Bearer ${token}` }),
      await makeRequest.post<Response>(mutation, { input }, 200, { authorization: `Bearer ${token}` }),
    ])

    const firstGroupResponse = firstResponse.body.data.createGroup
    const secondGroupResponse = secondResponse.body.data.createGroup
    const firstGroupData = await repositories.group.findOneOrFail({ where: { id: firstGroupResponse.id } })
    const secondGroupData = await repositories.group.findOneOrFail({ where: { id: secondGroupResponse.id } })
    const groupsDatabase = await repositories.group.find({ where: { group_creator: user.id } })

    expect(firstGroupResponse).to.be.deep.eq({
      id: firstGroupData.id,
      name: firstGroupData.name,
      description: firstGroupData.description,
      group_creator: firstGroupData.group_creator,
    })
    expect(secondGroupResponse).to.be.deep.eq({
      id: secondGroupData.id,
      name: secondGroupData.name,
      description: secondGroupData.description,
      group_creator: secondGroupData.group_creator,
    })
    expect(groupsDatabase).to.have.length(2)
  })

  it('should return an error if the token is invalid', async () => {
    const response = await makeRequest.post<Response>(mutation, { input }, 200, {
      authorization: `Bearer invalid-token`,
    })

    expect(response.body.errors[0]).to.have.property('message').that.is.eq('invalid token')
  })
})
