import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'
import { PostEntity } from './post.entity'

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @ManyToOne(() => PostEntity)
  post: PostEntity

  @ManyToOne(() => UserEntity)
  user: UserEntity
}
