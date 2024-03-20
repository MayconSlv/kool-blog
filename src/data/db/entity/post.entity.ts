import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @ManyToOne(() => UserEntity)
  user: UserEntity
}
