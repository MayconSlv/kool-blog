import { UserDbDataSource } from '@data/user'
import { AuthenticatedUserModel, AuthenticateUserModel } from '@domain/model'
import { compare } from 'bcryptjs'
import { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import { Env } from '@env'

@Service()
export class AuthenticateUserUseCase {
  constructor(private readonly userDataSource: UserDbDataSource) {}

  async execute(input: AuthenticateUserModel): Promise<AuthenticatedUserModel> {
    const { password, usernameOrEmail } = input

    const user = await this.userDataSource.findOne(usernameOrEmail)
    if (!user) {
      throw new Error('Invalid credentials error')
    }

    const doesPasswordMatch = await compare(password, user.passwordHash)
    if (!doesPasswordMatch) {
      throw new Error('invalid credentials error')
    }

    const token = jwt.sign(
      {
        sub: user.id,
      },
      Env.JWT_SECRET_KEY,
      {
        expiresIn: '3d',
      },
    )

    return {
      user,
      token,
    }
  }
}
