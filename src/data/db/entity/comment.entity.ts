import { Column, Entity, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'
import { PostEntity } from './post.entity'
import { BaseColumnsEntity } from '@data/db/core'

@Entity({ name: 'comment' })
export class CommentEntity extends BaseColumnsEntity {
  @Column()
  content: string

  @ManyToOne(() => PostEntity)
  post: PostEntity

  @ManyToOne(() => UserEntity)
  user: UserEntity
}
