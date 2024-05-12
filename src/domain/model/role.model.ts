import { UserModel } from './user.model'

export enum Roles {
  admin = 'admin',
  moderador = 'moderador',
  user = 'user',
}

export interface RoleModel {
  id: string
  name: Roles
}

export interface UserRoleModel {
  id: string
  user: UserModel
  role: RoleModel
}

export interface UserRoleInputModel {
  userId: string
  roleId: string
}

export interface CheckUserRoleInputModel {
  userId: string
  permissions: string[]
}

export interface PermissionModel {
  name: string
}

export interface RolePermissionModel {
  id: string
  role: RoleModel
  permission: PermissionModel
}
