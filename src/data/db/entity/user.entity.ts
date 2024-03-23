import { Column, Entity } from 'typeorm'
import { BaseColumnsEntity } from '@data/db/core'

@Entity({ name: 'user' })
export class UserEntity extends BaseColumnsEntity {
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
