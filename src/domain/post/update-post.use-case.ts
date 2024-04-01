import { PostDbDataSource } from '@data/post'
import { PostModel, UpdatePostContentInputModel } from '@domain/model'
import { Service } from 'typedi'

@Service()
export class UpdatePostContentUseCase {
  constructor(private readonly postDataSource: PostDbDataSource) {}

  async execute(input: UpdatePostContentInputModel, userId: string): Promise<PostModel> {
    const post = await this.postDataSource.findOne(input.id)
    if (!post) {
      throw new Error('Not found error')
    }

    if (post.user.id !== userId) {
      throw new Error('unauthorized')
    }

    return this.postDataSource.update(input)
  }
}
