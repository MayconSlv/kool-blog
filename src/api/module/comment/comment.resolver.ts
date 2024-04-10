import { CreateCommentUseCase, DeleteCommentUseCase, UpdateCommentUseCase } from '@domain/comment'
import { CommentModel } from '@domain/model/comment.model'
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Comment } from './comment.type'
import { CreateCommentInput, UpdateCommentInput } from './comment.input'
import { ContextInterface } from '@api/graphql.context'

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
  createComment(@Arg('input') input: CreateCommentInput, @Ctx() context: ContextInterface): Promise<CommentModel> {
    return this.createCommentUseCase.execute({ ...input, userId: context.userId! })
  }

  @Mutation(() => String, { description: 'Deleta um comentário' })
  @Authorized()
  deleteComment(@Arg('commentId') commentId: string, @Ctx() context: ContextInterface): Promise<string> {
    return this.deleteCommentUseCase.execute({ commentId, userId: context.userId! })
  }

  @Mutation(() => Comment, { description: 'Atualiza um comentário' })
  @Authorized()
  updateComment(@Arg('input') input: UpdateCommentInput, @Ctx() context: ContextInterface): Promise<CommentModel> {
    return this.updateCommentUseCase.execute(input, context.userId!)
  }
}
