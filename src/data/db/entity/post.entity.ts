import { Column, Entity, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'
import { BaseColumnsEntity } from '@data/db/core'

@Entity({ name: 'post' })
export class PostEntity extends BaseColumnsEntity {
  @Column()
  content: string

  @ManyToOne(() => UserEntity, { cascade: true })
  user: UserEntity
}
