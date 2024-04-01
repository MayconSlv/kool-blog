import { PostDbDataSource } from '@data/post'
import { Service } from 'typedi'

@Service()
export class DeletePostUseCase {
  constructor(private readonly postDataSource: PostDbDataSource) {}

  async execute(id: string, userId: string): Promise<string> {
    await this.postDataSource.delete(id)

    const post = await this.postDataSource.findOne(id)
    if (!post) {
      throw new Error('Not found error')
    }

    if (post.user.id !== userId) {
      throw new Error('unauthoized')
    }

    return id
  }
}
