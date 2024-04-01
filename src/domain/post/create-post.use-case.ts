import { PostDbDataSource } from '@data/post'
import { UserDbDataSource } from '@data/user'
import { CreatePostInputModel, PostModel } from '@domain/model/post.model'
import { Service } from 'typedi'

@Service()
export class CreatePostUseCase {
  constructor(
    private readonly postDataSource: PostDbDataSource,
    private readonly userDataSource: UserDbDataSource,
  ) {}

  async execute(input: CreatePostInputModel, userId: string): Promise<PostModel> {
    const user = await this.userDataSource.findById(userId)
    if (!user) {
      throw new Error('User not found.')
    }

    return this.postDataSource.create({
      content: input.content,
      userId: user.id,
    })
  }
}
