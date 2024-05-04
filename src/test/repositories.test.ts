import { DBConnection } from '@data/db/config'
import { CommentEntity, PostEntity, RoleEntity, UserEntity, UserRolesEntity } from '@data/db/entity'
import { Service } from 'typedi'

@Service()
export class Repositories {
  user = DBConnection.getRepository(UserEntity)
  post = DBConnection.getRepository(PostEntity)
  comment = DBConnection.getRepository(CommentEntity)
  role = DBConnection.getRepository(RoleEntity)
  userRole = DBConnection.getRepository(UserRolesEntity)

  async clear(): Promise<void> {
    await DBConnection.query('DELETE FROM "comment";')
    await DBConnection.query('DELETE FROM "post";')
    await DBConnection.query('DELETE FROM "user_roles";')
    await DBConnection.query('DELETE FROM "role";')
    await DBConnection.query('DELETE FROM "user";')
  }
}
