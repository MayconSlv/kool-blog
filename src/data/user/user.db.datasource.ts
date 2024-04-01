import { DBConnection } from '@data/db/config'
import { UserEntity } from '@data/db/entity'
import { UserModel } from '@domain/model'
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

  findOne(usernameOrEmail: string): Promise<UserEntity | null> {
    return this.repository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: usernameOrEmail })
      .orWhere('user.email = :email', { email: usernameOrEmail })
      .getOne()
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { id } })
  }

  createUser(input: CreateUserDataInput): Promise<UserModel> {
    return this.repository.save(input)
  }
}
