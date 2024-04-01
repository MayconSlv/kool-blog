import { ContextInterface } from '@api/graphql.context'
import { Env } from '@env'
import jwt from 'jsonwebtoken'
import { AuthChecker } from 'type-graphql'

export const ValidateAuthorizationToken: AuthChecker<ContextInterface> = ({ context }): boolean => {
  if (!context.token) {
    throw new Error('token not proved')
  }

  try {
    jwt.verify(context.token, Env.JWT_SECRET_KEY)
  } catch (error) {
    throw new Error('invalid token')
  }

  return true
}
