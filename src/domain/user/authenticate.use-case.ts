import { UserDbDataSource } from '@data/user'
import { AuthenticatedUserModel, AuthenticateUserModel } from '@domain/model'
import { compare } from 'bcryptjs'
import { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import { Env } from '@env'
import { UserRoleDbDataSource } from '@data/role'

@Service()
export class AuthenticateUserUseCase {
  constructor(
    private readonly userDataSource: UserDbDataSource,
    private readonly userRoleDataSource: UserRoleDbDataSource,
  ) {}

  async execute(input: AuthenticateUserModel): Promise<AuthenticatedUserModel> {
    const { password, usernameOrEmail } = input

    const user = await this.userDataSource.findOne(usernameOrEmail)
    if (!user) {
      throw new Error('invalid credentials error')
    }
    const userRole = await this.userRoleDataSource.findByUserId(user.id)
    const userRolesName = userRole.map((item) => item.role.name)

    const doesPasswordMatch = await compare(password, user.passwordHash)
    if (!doesPasswordMatch) {
      throw new Error('invalid credentials error')
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: userRolesName,
      },
      Env.JWT_SECRET_KEY,
      {
        expiresIn: Env.JWT_EXPIRATION_TIME,
      },
    )

    return { user, token }
  }
}
