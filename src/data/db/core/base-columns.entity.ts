import { CreateDateColumn, Generated, PrimaryColumn, UpdateDateColumn, ValueTransformer } from 'typeorm'

const transformerIdStringNumber: ValueTransformer = {
  from: (dbToEntityId) => (typeof dbToEntityId === 'number' ? dbToEntityId.toString() : dbToEntityId),
  to: (entityToDbId) => (typeof entityToDbId === 'string' ? +entityToDbId : entityToDbId),
}

export class BaseColumnsEntity {
  @Generated('increment')
  @PrimaryColumn('int4', { transformer: transformerIdStringNumber })
  id: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
