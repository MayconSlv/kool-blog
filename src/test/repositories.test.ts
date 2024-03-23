import { DBConnection } from '@data/db/config'
import { CommentEntity, PostEntity, UserEntity } from '@data/db/entity'
import { Service } from 'typedi'

@Service()
export class Repositories {
  userRepository = DBConnection.getRepository(UserEntity)
  postRepository = DBConnection.getRepository(PostEntity)
  commentRepository = DBConnection.getRepository(CommentEntity)

  async clear(): Promise<void> {
    await this.userRepository.delete({})
    await this.postRepository.delete({})
    await this.commentRepository.delete({})
  }
}
