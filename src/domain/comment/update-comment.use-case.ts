import { CommentDbDataSource } from '@data/comment'
import { CommentModel } from '@domain/model/comment.model'
import { Service } from 'typedi'

@Service()
export class UpdateCommentUseCase {
  constructor(private readonly commentDataSource: CommentDbDataSource) {}

  async execute(input: CommentModel): Promise<CommentModel> {
    const comment = await this.commentDataSource.findOne(input.id)
    if (!comment) {
      throw new Error('Not found error')
    }

    return this.commentDataSource.update(input)
  }
}
