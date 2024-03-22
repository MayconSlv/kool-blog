import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'
import { PostEntity } from './post.entity'

<<<<<<< Updated upstream
@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number

=======
<<<<<<< Updated upstream
@Entity({ name: 'comment' })
=======
@Entity()
>>>>>>> Stashed changes
export class CommentEntity extends BaseColumnsEntity {
>>>>>>> Stashed changes
  @Column()
  content: string

  @ManyToOne(() => PostEntity)
  post: PostEntity

  @ManyToOne(() => UserEntity)
  user: UserEntity
}
