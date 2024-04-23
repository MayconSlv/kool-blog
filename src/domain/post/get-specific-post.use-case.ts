import { PostDbDataSource } from '@data/post'
import { DetailedPostModel, PostModel } from '@domain/model'
import { Service } from 'typedi'

@Service()
export class GetSpecificPostUseCase {
  constructor(private readonly postDataSource: PostDbDataSource) {}

  async execute(postId: string): Promise<DetailedPostModel> {
    const post = await this.postDataSource.findOneWithComments(postId)

    if (!post) {
      throw new Error('Not found error')
    }

    return post
  }
}
