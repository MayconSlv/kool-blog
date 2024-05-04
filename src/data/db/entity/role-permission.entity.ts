import { Entity, ManyToOne } from 'typeorm'
import { BaseColumnsEntity } from '@data/db/core'
import { RoleEntity } from './role.entity'
import { PermissionEntity } from './permission.entity'

@Entity({ name: 'role_permissions' })
export class RolePermissionsEntity extends BaseColumnsEntity {
  @ManyToOne(() => RoleEntity, { cascade: true })
  role: RoleEntity

  @ManyToOne(() => PermissionEntity, { cascade: true })
  permission: PermissionEntity
}
