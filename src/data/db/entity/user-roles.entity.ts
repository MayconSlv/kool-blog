import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
import { BaseColumnsEntity } from '@data/db/core'
import { UserEntity } from './user.entity'
import { RoleEntity } from './role.entity'

@Entity({ name: 'user_roles' })
export class UserRolesEntity extends BaseColumnsEntity {
  @ManyToOne(() => UserEntity, { cascade: true })
  user: UserEntity

  @ManyToOne(() => RoleEntity, { cascade: true })
  role: RoleEntity
}
