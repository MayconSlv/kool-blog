import { UserDbDataSource } from '../../data/user/user.db.datasource'
import { Service } from 'typedi'
import { hash } from 'bcryptjs'
import { CreateUserInputModel, UserModel } from '../model'

@Service()
export class CreateUserUseCase {
  constructor(private readonly userDataSource: UserDbDataSource) {}

  async execute(input: CreateUserInputModel): Promise<UserModel> {
    const userWithSameEmail = await this.userDataSource.findOne(input.email)

    if (userWithSameEmail) {
      throw new Error('email already exists.')
    }

    const userWithSameUsername = await this.userDataSource.findOne(input.username)
    if (userWithSameUsername) {
      throw new Error('username already exists')
    }

    return this.userDataSource.createUser({
      ...input,
      passwordHash: await hash(input.password, 6),
    })
  }
}
