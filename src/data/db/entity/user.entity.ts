import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
@Entity({ name: 'user' })
=======
@Entity()
>>>>>>> Stashed changes
export class UserEntity extends BaseColumnsEntity {
>>>>>>> Stashed changes
  @Column()
  name: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  passwordHash: string

  @Column()
  birthDate: Date
}
