import { ContextInterface } from '@api/graphql.context'
import { Env } from '@env'
import jwt from 'jsonwebtoken'
import { AuthChecker } from 'type-graphql'

export const ValidateAuthorizationToken: AuthChecker<ContextInterface> = ({ context }): boolean => {
  const authHeader = context.token
  if (!authHeader) {
    throw new Error('sem token ')
  }

  const [, token] = authHeader.split(' ')
  try {
    jwt.verify(token, Env.JWT_SECRET_KEY)
  } catch (error) {
    throw new Error('token invalido')
  }

  return true
}
