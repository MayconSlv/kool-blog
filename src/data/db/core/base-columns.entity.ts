import {
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

export class BaseColumnsEntity {
<<<<<<< Updated upstream
  @Generated()
  @PrimaryColumn()
=======
  @PrimaryColumn('uuid')
  @Generated()
>>>>>>> Stashed changes
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
