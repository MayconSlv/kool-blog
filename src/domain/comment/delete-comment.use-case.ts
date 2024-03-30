import { CommentDbDataSource } from '@data/comment'
import { Service } from 'typedi'

@Service()
export class DeleteCommentUseCase {
  constructor(private readonly commentDataSource: CommentDbDataSource) {}

  async execute(id: string): Promise<string> {
    const comment = await this.commentDataSource.findOne(id)
    if (!comment) {
      throw new Error('not found error')
    }

    await this.commentDataSource.delete(id)

    return id
  }
}
