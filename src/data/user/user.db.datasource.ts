import { DBConnection } from '@data/db/config'
import { UserEntity } from '@data/db/entity'
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
  private readonly repository: Repository<UserEntity> = DBConnection.getRepository(UserEntity)

  findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { email } })
  }

  findByUsername(username: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { username } })
  }

  createUser(input: CreateUserDataInput): Promise<UserEntity> {
    return this.repository.save(input)
  }
}
