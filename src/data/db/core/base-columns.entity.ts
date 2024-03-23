import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

export class BaseColumnsEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated()
  @PrimaryColumn()
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
