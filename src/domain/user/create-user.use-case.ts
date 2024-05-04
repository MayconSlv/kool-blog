import { UserDbDataSource } from '../../data/user/user.db.datasource'
import { Service } from 'typedi'
import { hash } from 'bcryptjs'
import { CreateUserInputModel, Roles, UserModel } from '../model'
import { UserRoleDbDataSource } from '@data/role/user-role.db.datasource'
import { RoleDbDataSource } from '@data/role'

@Service()
export class CreateUserUseCase {
  constructor(
    private readonly userDataSource: UserDbDataSource,
    private readonly userRoleDataSource: UserRoleDbDataSource,
    private readonly roleDataSource: RoleDbDataSource,
  ) {}

  async execute(input: CreateUserInputModel): Promise<UserModel> {
    const userWithSameEmail = await this.userDataSource.findOne(input.email)
    if (userWithSameEmail) {
      throw new Error('email already exists.')
    }

    const userWithSameUsername = await this.userDataSource.findOne(input.username)
    if (userWithSameUsername) {
      throw new Error('username already exists')
    }

    const user = await this.userDataSource.createUser({
      ...input,
      passwordHash: await hash(input.password, 6),
    })

    const userDefaultRole = await this.roleDataSource.findByName(Roles.user)
    await this.userRoleDataSource.save({ userId: user.id, roleId: userDefaultRole.id })

    return user
  }
}
