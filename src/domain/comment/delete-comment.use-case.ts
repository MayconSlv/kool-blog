import { CommentDbDataSource } from '@data/comment'
import { Service } from 'typedi'

@Service()
export class DeleteCommentUseCase {
  constructor(private readonly commentDataSource: CommentDbDataSource) {}

  async execute(id: string, userId: string): Promise<string> {
    const comment = await this.commentDataSource.findOne(id)
    if (!comment) {
      throw new Error('not found error')
    }

    if (comment.user.id !== userId) {
      throw new Error('unauthorized')
    }

    await this.commentDataSource.delete(id)

    return id
  }
}
