import { Env } from '../../env'
import path from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

export const DbOptions: DataSourceOptions = {
  type: 'postgres' as const,
  host: 'localhost',
  port: Env.PORT,
  username: Env.DB_USERNAME,
  password: Env.DB_PASSWORD,
  database: Env.DB_DATABASE,
  entities: [path.join(__dirname, './') + 'entity/index.{ts,js}'],
  migrations: [path.join(__dirname, './') + 'migration/*.{ts,js}'],
}

export const DBConnection = new DataSource(DbOptions)
