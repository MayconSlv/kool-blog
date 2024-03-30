import { CommentEntity, PostEntity, UserEntity } from '@data/db/entity'

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

export function createPost(options: Partial<PostEntity> = {}): PostEntity {
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

  return Object.assign(new PostEntity(), defaultPost, { user }, options)
}

export function createComment(options: Partial<CommentEntity> = {}): CommentEntity {
  const user: Partial<UserEntity> = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@email.com',
    passwordHash: '123456',
    birthDate: new Date('01/01/2001'),
  }

  const post: Partial<PostEntity> = {
    content: 'lorem ipsum',
  }

  const defaultComment: Partial<CommentEntity> = {
    content: 'nice post hahah',
  }

  return Object.assign(new CommentEntity(), defaultComment, { user }, { post }, options)
}
