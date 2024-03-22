import { Column, Entity, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'
import { BaseColumnsEntity } from '../core'

@Entity({ name: 'post' })
export class PostEntity extends BaseColumnsEntity {
  @Column()
  content: string

  @ManyToOne(() => UserEntity)
  user: UserEntity
}
