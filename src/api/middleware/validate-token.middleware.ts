import { AuthorizedContextInterface } from '@api/graphql.context'
import { UserRoleDbDataSource } from '@data/role'
import { UserDbDataSource } from '@data/user'
import { CheckUserRoleUseCase } from '@domain/role'
import { Env } from '@env'
import jwt from 'jsonwebtoken'
import { type AuthChecker } from 'type-graphql'

export const ValidateAuthorizationToken: AuthChecker<AuthorizedContextInterface> = async (
  { context },
  role,
): Promise<boolean> => {
  const userDataSource = new UserDbDataSource()
  const userRoleDataSource = new UserRoleDbDataSource()
  const checkUserRoleUseCase = new CheckUserRoleUseCase(userDataSource, userRoleDataSource)

  if (!context.token) {
    throw new Error('token not proved')
  }

  try {
    jwt.verify(context.token, Env.JWT_SECRET_KEY)
  } catch (error) {
    throw new Error('invalid token')
  }

  await checkUserRoleUseCase.exec({ userId: context.userId, roles: role })

  return true
}
