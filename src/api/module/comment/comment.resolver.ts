import { CreateCommentUseCase, DeleteCommentUseCase, UpdateCommentUseCase } from '@domain/comment'
import { CommentModel } from '@domain/model/comment.model'
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Comment } from './comment.type'
import { CreateCommentInput, UpdateCommentInput } from './comment.input'

@Service()
@Resolver()
export class CommentResolver {
  constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
    private readonly updateCommentUseCase: UpdateCommentUseCase,
  ) {}

  @Mutation(() => Comment, { description: 'Cria um comentário em um post' })
  @Authorized()
  createComment(@Arg('input') input: CreateCommentInput): Promise<CommentModel> {
    return this.createCommentUseCase.execute(input)
  }

  @Mutation(() => String, { description: 'Deleta um comentário' })
  @Authorized()
  deleteComment(@Arg('commentId') commentId: string): Promise<string> {
    return this.deleteCommentUseCase.execute(commentId)
  }

  @Mutation(() => Comment, { description: 'Atualiza um comentário' })
  @Authorized()
  updateComment(@Arg('input') input: UpdateCommentInput): Promise<CommentModel> {
    return this.updateCommentUseCase.execute(input)
  }
}
