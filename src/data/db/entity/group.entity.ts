import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { BaseColumnsEntity } from '../core'
import { UserEntity } from './user.entity'

@Entity({ name: 'group' })
export class GroupEntity extends BaseColumnsEntity {
  @Column({ length: '50' })
  name: string

  @Column({ length: '200' })
  description: string

  @ManyToMany(() => UserEntity, (user) => user.groups)
  @JoinTable({ name: 'participants_groups' })
  participants: UserEntity[]

  @Column()
  group_creator: string
}
