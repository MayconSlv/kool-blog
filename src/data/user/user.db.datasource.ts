import { DBConnection } from 'data/db/config'
import { UserEntity } from 'data/db/entity'
import { UserModel } from 'domain/model'
import { Service } from 'typedi'
import { Repository } from 'typeorm'

interface CreateUserDataInput {
  name: string
  username: string
  email: string
  passwordHash: string
  birthDate: Date
}

@Service()
export class UserDbDataSource {
  private readonly repository: Repository<UserEntity> =
    DBConnection.getRepository(UserEntity)

  findOneByEmail(email: string): Promise<UserModel | null> {
    return this.repository.findOne({ where: { email } })
  }

  createUser(input: CreateUserDataInput): Promise<UserModel> {
    return this.repository.save(input)
  }
}