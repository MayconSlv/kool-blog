import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseColumnsEntity } from '@data/db/core'
import { GroupEntity } from './group.entity'

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

  @ManyToMany(() => GroupEntity, (group) => group.participants)
  @JoinTable()
  groups: GroupEntity[]
}
