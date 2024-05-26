import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test']).default('dev'),
  PORT: z.coerce.number().default(5432),
  DB_DATABASE: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRATION_TIME: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.log('🚨 Invalid environment variables.', _env.error.message)

  throw new Error('Invalid enrionment variables.')
}

export const Env = _env.data
