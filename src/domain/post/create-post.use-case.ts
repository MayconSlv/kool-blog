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
    return this.postDataSource.create({
      content: input.content,
      userId,
    })
  }
}
