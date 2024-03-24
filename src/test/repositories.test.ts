import { DBConnection } from '@data/db/config'
import { CommentEntity, PostEntity, UserEntity } from '@data/db/entity'
import { Service } from 'typedi'

@Service()
export class Repositories {
  user = DBConnection.getRepository(UserEntity)
  post = DBConnection.getRepository(PostEntity)
  comment = DBConnection.getRepository(CommentEntity)

  async clear(): Promise<void> {
    await DBConnection.query('DELETE FROM "post";')
    await DBConnection.query('DELETE FROM "user";')
  }
}
