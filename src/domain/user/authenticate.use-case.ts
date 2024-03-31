import { UserDbDataSource } from '@data/user'
import { AuthenticateUserModel } from '@domain/model'
import { compare } from 'bcryptjs'
import { Service } from 'typedi'
import jwt from 'jsonwebtoken'

@Service()
export class AuthenticateUserUseCase {
  constructor(private readonly userDataSource: UserDbDataSource) {}

  async execute(input: AuthenticateUserModel): Promise<any> {
    const { password, usernameOrEmail } = input

    const user = await this.userDataSource.findOne(usernameOrEmail)
    if (!user) {
      throw new Error('Invalid credentials error')
    }

    const doesPasswordMatch = await compare(password, user.passwordHash)
    if (!doesPasswordMatch) {
      throw new Error('invalid credentials error')
    }

    const token = jwt.sign({}, 'aksdfnaklsf', {
      expiresIn: '3d',
    })

    return {
      user,
      token,
    }
  }
}
