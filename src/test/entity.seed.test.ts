import { UserEntity } from '@data/db/entity'
import { hash } from 'bcryptjs'

export function createUser(options: Partial<UserEntity> = {}): UserEntity {
  const defaultUser: Partial<UserEntity> = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@email.com',
    passwordHash: '123456',
    birthDate: new Date('01/01/2001'),
  }
  return Object.assign(new UserEntity(), defaultUser, options)
}
