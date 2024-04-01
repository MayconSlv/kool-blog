import { DBConnection } from '@data/db/config'
import { CommentEntity } from '@data/db/entity'
import { CommentModel, CreateCommentInputModel } from '@domain/model/comment.model'
import { Service } from 'typedi'
import { Repository } from 'typeorm'

@Service()
export class CommentDbDataSource {
  private readonly repository: Repository<CommentEntity> = DBConnection.getRepository(CommentEntity)

  create(input: CreateCommentInputModel, userId: string): Promise<CommentModel> {
    const { postId, content } = input

    return this.repository.save({
      post: { id: postId },
      user: { id: userId },
      content,
    })
  }

  findOne(id: string): Promise<CommentEntity | null> {
    return this.repository.findOne({ where: { id } })
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id })
  }

  async update(input: CommentModel): Promise<CommentModel> {
    const { id, content } = input

    await this.repository
      .createQueryBuilder('comment')
      .update(CommentEntity)
      .set({ content })
      .where('comment.id = :id', { id })
      .execute()

    return this.repository.findOneOrFail({ where: { id } })
  }
}
