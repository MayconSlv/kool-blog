import { PostEntity, UserEntity } from '@data/db/entity'

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

export function createPost(opctions: Partial<PostEntity> = {}): PostEntity {
  const user: Partial<UserEntity> = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@email.com',
    passwordHash: '123456',
    birthDate: new Date('01/01/2001'),
  }

  const defaultPost: Partial<PostEntity> = {
    content: 'lorem ipsum',
  }

  return Object.assign(new PostEntity(), defaultPost, { user }, opctions)
}
