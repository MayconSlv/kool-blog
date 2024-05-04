import { Column, Entity } from 'typeorm'
import { BaseColumnsEntity } from '@data/db/core'

@Entity({ name: 'permission' })
export class PermissionEntity extends BaseColumnsEntity {
  @Column()
  name: string
}
