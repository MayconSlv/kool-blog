import { UserDbDataSource } from 'data/user/user.db.datasource'
import { CreateUserInputModel, UserModel } from 'domain/model/user.model'
import { Service } from 'typedi'
import { hash } from 'bcryptjs'

@Service()
export class CreateUserUseCase {
  constructor(private readonly userDataSource: UserDbDataSource) {}

  async exec(input: CreateUserInputModel): Promise<UserModel> {
    const userWithSameEmail = await this.userDataSource.findOneByEmail(
      input.email,
    )

    if (userWithSameEmail) {
      throw new Error('email already exists.')
    }

    const userWithSameUsername = await this.userDataSource.findByUsername(
      input.username,
    )
    if (userWithSameUsername) {
      throw new Error('username already exists')
    }

    return this.userDataSource.createUser({
      ...input,
      passwordHash: await hash(input.password, 6),
    })
  }
}
