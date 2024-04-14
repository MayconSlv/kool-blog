import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { UserEntity } from './user.entity'
import { BaseColumnsEntity } from '@data/db/core'
import { CommentEntity } from './comment.entity'

@Entity({ name: 'post' })
export class PostEntity extends BaseColumnsEntity {
  @Column()
  content: string

  @ManyToOne(() => UserEntity, { cascade: true })
  user: UserEntity

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[]
}
