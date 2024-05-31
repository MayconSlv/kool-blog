import { RolePermissionDbDataSource, UserRoleDbDataSource } from '@data/role'
import { UserDbDataSource } from '@data/user'
import { CheckUserRoleInputModel } from '@domain/model'
import { Service } from 'typedi'

@Service()
export class CheckUserPermissionsUseCase {
  constructor(
    private readonly userDataSource: UserDbDataSource,
    private readonly userRoleDataSource: UserRoleDbDataSource,
    private readonly rolePermissionsDataSource: RolePermissionDbDataSource,
  ) {}

  async exec(input: CheckUserRoleInputModel): Promise<boolean> {
    const { permissions, userId } = input

    const user = await this.userDataSource.findById(userId)
    if (!user) {
      throw new Error('not found error')
    }

    const dbUserRoles = await this.userRoleDataSource.findByUserId(user.id)
    const userPermissions: string[] = []

    for (const userRole of dbUserRoles) {
      const rolePermissions = await this.rolePermissionsDataSource.findByRoleId(userRole.role.id)
      if (!rolePermissions) {
        throw new Error('deu erro')
      }

      rolePermissions.forEach((item) => {
        userPermissions.push(item.permission.name)
      })
    }

    if (!userPermissions.includes(permissions[0])) {
      throw new Error('deu erro')
    }

    return true
  }
}
