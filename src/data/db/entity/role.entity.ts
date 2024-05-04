import { Column, Entity } from 'typeorm'
import { BaseColumnsEntity } from '@data/db/core'
import { Roles } from '@domain/model'

@Entity({ name: 'role' })
export class RoleEntity extends BaseColumnsEntity {
  @Column({ type: 'enum', enum: Roles })
  name: Roles
}
