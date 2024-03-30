import { DBConnection } from '@data/db/config'
import { CommentEntity } from '@data/db/entity'
import { CommentModel, CreateCommentInputModel } from '@domain/model/comment.model'
import { Service } from 'typedi'
import { Repository } from 'typeorm'

@Service()
export class CommentDbDataSource {
  private readonly repository: Repository<CommentEntity> = DBConnection.getRepository(CommentEntity)

  create(input: CreateCommentInputModel): Promise<CommentModel> {
    const { postId, username, content } = input

    return this.repository.save({
      post: { id: postId },
      user: { username },
      content,
    })
  }

  findOne(id: string): Promise<CommentModel | null> {
    return this.repository.findOne({ where: { id } })
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id })
  }
}
