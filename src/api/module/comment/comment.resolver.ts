import { CreateCommentUseCase } from '@domain/comment'
import { CommentModel } from '@domain/model/comment.model'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Comment } from './comment.type'
import { CreateCommentInput } from './comment.input'
import { DeleteCommentUseCase } from '@domain/comment/delete-comment.use-case'

@Service()
@Resolver()
export class CommentResolver {
  constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
  ) {}

  @Mutation(() => Comment, { description: 'Cria um comentário em um post' })
  createComment(@Arg('input') input: CreateCommentInput): Promise<CommentModel> {
    return this.createCommentUseCase.execute(input)
  }

  @Mutation(() => String, { description: 'Deleta um comentário' })
  deleteComment(@Arg('commentId') commentId: string): Promise<string> {
    return this.deleteCommentUseCase.execute(commentId)
  }
}
