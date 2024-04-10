import { CommentDbDataSource } from '@data/comment'
import { DeleteCommentModel } from '@domain/model/comment.model'
import { Service } from 'typedi'

@Service()
export class DeleteCommentUseCase {
  constructor(private readonly commentDataSource: CommentDbDataSource) {}

  async execute(input: DeleteCommentModel): Promise<string> {
    const comment = await this.commentDataSource.findOne(input.commentId)
    if (!comment) {
      throw new Error('not found error')
    }

    if (comment.user.id !== input.userId) {
      throw new Error('unauthorized')
    }

    await this.commentDataSource.delete(input.commentId)

    return input.commentId
  }
}
