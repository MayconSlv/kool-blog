import { AuthorizedContextInterface } from '@api/graphql.context'
import { CheckUserPermissionsUseCase } from '@domain/role'
import { Env } from '@env'
import jwt from 'jsonwebtoken'
import { type AuthChecker } from 'type-graphql'
import Container from 'typedi'

export const ValidateAuthorizationToken: AuthChecker<AuthorizedContextInterface> = async (
  { context },
  permissions,
): Promise<boolean> => {
  const checkUserPermissionsUseCase = Container.get(CheckUserPermissionsUseCase)

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
