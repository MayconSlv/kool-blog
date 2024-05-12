import { UserRoleDbDataSource } from '@data/role/user-role.db.datasource'
import { UserDbDataSource } from '@data/user'
import { CheckUserRoleInputModel, Roles } from '@domain/model'
import { Service } from 'typedi'

@Service()
export class CheckUserRoleUseCase {
  constructor(
    private readonly userDataSource: UserDbDataSource,
    private readonly userRoleDataSource: UserRoleDbDataSource,
  ) {}

  async exec(input: CheckUserRoleInputModel): Promise<boolean> {
    const { roles, userId } = input

    const user = await this.userDataSource.findById(userId)
    if (!user) {
      throw new Error('not found error')
    }

    const dbUserRole = await this.userRoleDataSource.findByUserId(user.id)
    for (const role of dbUserRole) {
      if (!roles.includes(role.role.name)) {
        throw new Error('erro hahaha')
      }
    }

    return true
  }
}
