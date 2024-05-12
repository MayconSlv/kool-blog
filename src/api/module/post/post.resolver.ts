import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { DetailedPost, Post } from './post.type'
import { CreatePostInput, UpdatePostInput } from './post.input'
import { DetailedPostModel, PostModel } from '@domain/model/post.model'
import { CreatePostUseCase, DeletePostUseCase, GetAllPostUseCase } from '@domain/post'
import { UpdatePostContentUseCase } from '@domain/post/update-post.use-case'
import { AuthorizedContextInterface } from '@api/graphql.context'
import { GetSpecificPostUseCase } from '@domain/post/get-specific-post.use-case'

@Service()
@Resolver()
export class PostResolver {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getPostsUseCase: GetAllPostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly updatePostContentUseCase: UpdatePostContentUseCase,
    private readonly getSpecificPostUseCase: GetSpecificPostUseCase,
  ) {}

  @Mutation(() => Post, { description: 'Cria um post' })
  @Authorized()
  createPost(@Arg('input') input: CreatePostInput, @Ctx() context: AuthorizedContextInterface): Promise<PostModel> {
    return this.createPostUseCase.execute({ ...input, userId: context.userId })
  }

  @Query(() => [Post], { description: 'Listar todos os posts' })
  getPosts(): Promise<PostModel[]> {
    return this.getPostsUseCase.execute()
  }

  @Mutation(() => String)
  @Authorized()
  deletePost(@Arg('postId') postId: string, @Ctx() context: AuthorizedContextInterface): Promise<string> {
    return this.deletePostUseCase.execute(postId, context.userId)
  }

  @Mutation(() => Post)
  @Authorized()
  updatePost(@Arg('input') input: UpdatePostInput, @Ctx() context: AuthorizedContextInterface): Promise<PostModel> {
    return this.updatePostContentUseCase.execute(input, context.userId)
  }

  @Query(() => DetailedPost, { description: 'Detalhes de um post' })
  getPost(@Arg('postId') postId: string): Promise<DetailedPostModel> {
    return this.getSpecificPostUseCase.execute(postId)
  }
}
