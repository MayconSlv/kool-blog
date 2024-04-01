import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Post } from './post.type'
import { CreatePostInput, UpdatePostInput } from './post.input'
import { PostModel } from '@domain/model/post.model'
import { CreatePostUseCase, DeletePostUseCase, GetAllPostUseCase } from '@domain/post'
import { UpdatePostContentUseCase } from '@domain/post/update-post.use-case'
import { ContextInterface } from '@api/graphql.context'

@Service()
@Resolver()
export class PostResolver {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getPostsUseCase: GetAllPostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly updatePostContentUseCase: UpdatePostContentUseCase,
  ) {}

  @Mutation(() => Post, { description: 'Cria um post' })
  @Authorized()
  createPost(@Arg('input') input: CreatePostInput, @Ctx() context: ContextInterface): Promise<PostModel> {
    return this.createPostUseCase.execute(input, context.userId)
  }

  @Query(() => [Post], { description: 'Listar todos os posts' })
  getPosts(): Promise<PostModel[]> {
    return this.getPostsUseCase.execute()
  }

  @Mutation(() => String)
  @Authorized()
  deletePost(@Arg('postId') postId: string, @Ctx() context: ContextInterface): Promise<string> {
    return this.deletePostUseCase.execute(postId, context.userId)
  }

  @Mutation(() => Post)
  @Authorized()
  updatePost(@Arg('input') input: UpdatePostInput, @Ctx() context: ContextInterface): Promise<PostModel> {
    return this.updatePostContentUseCase.execute(input, context.userId)
  }
}
