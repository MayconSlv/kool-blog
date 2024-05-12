import { AuthorizedContextInterface } from '@api/graphql.context'
import { makeCheckRolePermissionsUseCase } from '@domain/factories'
import { Env } from '@env'
import jwt from 'jsonwebtoken'
import { type AuthChecker } from 'type-graphql'

export const ValidateAuthorizationToken: AuthChecker<AuthorizedContextInterface> = async (
  { context },
  permissions,
): Promise<boolean> => {
  const checkUserPermissionsUseCase = makeCheckRolePermissionsUseCase()

  if (!context.token) {
    throw new Error('token not proved')
  }

  try {
    jwt.verify(context.token, Env.JWT_SECRET_KEY)
  } catch (error) {
    throw new Error('invalid token')
  }

  await checkUserPermissionsUseCase.exec({ userId: context.userId, permissions })

  return true
}
