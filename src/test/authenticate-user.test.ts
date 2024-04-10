import { UserEntity } from '@data/db/entity'
import * as jwt from 'jsonwebtoken'
import { Env } from '@env'

export function authenticateUser(user: UserEntity): string {
  const token = jwt.sign(
    {
      sub: user.id,
    },
    Env.JWT_SECRET_KEY,
    {
      expiresIn: '3d',
    },
  )
  return token
}
