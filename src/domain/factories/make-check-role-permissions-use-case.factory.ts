import { RolePermissionDbDataSource, UserRoleDbDataSource } from '@data/role'
import { UserDbDataSource } from '@data/user'
import { CheckUserPermissionsUseCase } from '@domain/role'

export function makeCheckRolePermissionsUseCase() {
  const userDataSource = new UserDbDataSource()
  const userRoleDataSource = new UserRoleDbDataSource()
  const rolePermissionsDataSource = new RolePermissionDbDataSource()
  const checkUserPermissionsUseCase = new CheckUserPermissionsUseCase(
    userDataSource,
    userRoleDataSource,
    rolePermissionsDataSource,
  )

  return checkUserPermissionsUseCase
}
