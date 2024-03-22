import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'

<<<<<<< Updated upstream
@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

=======
<<<<<<< Updated upstream
@Entity({ name: 'post' })
=======
@Entity()
>>>>>>> Stashed changes
export class PostEntity extends BaseColumnsEntity {
>>>>>>> Stashed changes
  @Column()
  content: string

  @ManyToOne(() => UserEntity)
  user: UserEntity
}
