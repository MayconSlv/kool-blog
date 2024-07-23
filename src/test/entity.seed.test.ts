import {
  CommentEntity,
  PermissionEntity,
  PostEntity,
  RoleEntity,
  RolePermissionsEntity,
  UserEntity,
  UserRolesEntity,
} from '@data/db/entity'
import { Roles } from '@domain/model'
import { hash } from 'bcryptjs'

export function createUser(options: Partial<UserEntity> = {}): UserEntity {
  const defaultUser: Partial<UserEntity> = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@email.com',
    passwordHash: '123456',
    birthDate: new Date('01/01/2001'),
  }

  return Object.assign(new UserEntity(), defaultUser, options)
}

export function createPost(options: Partial<PostEntity> = {}): PostEntity {
  const user: Partial<UserEntity> = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@email.com',
    passwordHash: '123456',
    birthDate: new Date('01/01/2001'),
  }

  const defaultPost: Partial<PostEntity> = {
    content: 'lorem ipsum',
  }

  return Object.assign(new PostEntity(), defaultPost, { user }, options)
}

export function createComment(options: Partial<CommentEntity> = {}): CommentEntity {
  const user: Partial<UserEntity> = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@email.com',
    passwordHash: '123456',
    birthDate: new Date('01/01/2001'),
  }

  const post: Partial<PostEntity> = {
    content: 'lorem ipsum',
  }

  const defaultComment: Partial<CommentEntity> = {
    content: 'nice post hahah',
  }

  return Object.assign(new CommentEntity(), defaultComment, { user }, { post }, options)
}

export function createRole(options: Partial<RoleEntity> = {}): RoleEntity {
  const defaultRole: Partial<RoleEntity> = {
    name: Roles.user,
  }

  return Object.assign(new RoleEntity(), defaultRole, { defaultRole }, options)
}

export function createPermission(options: Partial<PermissionEntity> = {}): PermissionEntity {
  const defaultPermission: Partial<PermissionEntity> = {
    name: 'create',
  }

  return Object.assign(new PermissionEntity(), defaultPermission, options)
}

export function createRolePermission(options: Partial<RolePermissionsEntity> = {}): RolePermissionsEntity {
  const defaultRolePermission: Partial<RolePermissionsEntity> = {
    permission: { name: 'create', id: '1', createdAt: new Date(), updatedAt: new Date() },
    role: { name: Roles.user, id: '1', createdAt: new Date(), updatedAt: new Date() },
  }

  return Object.assign(new RolePermissionsEntity(), defaultRolePermission, options)
}

export function createUserRole(options: Partial<UserRolesEntity> = {}): UserRolesEntity {
  const defaultUserRole: Partial<UserRolesEntity> = {
    user: {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@email.com',
      username: 'johndoe',
      birthDate: new Date(),
      passwordHash: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      groups: [],
    },
    role: { name: Roles.user, id: '1', createdAt: new Date(), updatedAt: new Date() },
  }

  return Object.assign(new UserRolesEntity(), defaultUserRole, options)
}
