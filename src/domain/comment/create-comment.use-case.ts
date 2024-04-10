import { CommentDbDataSource } from '@data/comment'
import { PostDbDataSource } from '@data/post'
import { UserDbDataSource } from '@data/user'
import { CommentModel, CreateCommentInputModel } from '@domain/model/comment.model'
import { Service } from 'typedi'

@Service()
export class CreateCommentUseCase {
  constructor(
    private readonly commentDataSource: CommentDbDataSource,
    private readonly userDataSource: UserDbDataSource,
    private readonly postDataSource: PostDbDataSource,
  ) {}

  async execute(input: CreateCommentInputModel): Promise<CommentModel> {
    const { postId, userId } = input

    const user = await this.userDataSource.findById(userId)
    if (!user) {
      throw new Error('Not found error')
    }

    const post = await this.postDataSource.findOne(postId)
    if (!post) {
      throw new Error('Not found error')
    }

    return this.commentDataSource.create(input)
  }
}
