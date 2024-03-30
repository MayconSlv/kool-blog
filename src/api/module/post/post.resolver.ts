import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Post } from './post.type'
import { CreatePostInput, UpdatePostInput } from './post.input'
import { PostModel } from '@domain/model/post.model'
import { CreatePostUseCase, DeletePostUseCase, GetAllPostUseCase } from '@domain/post'
import { UpdatePostContentUseCase } from '@domain/post/update-post.use-case'

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
  createPost(@Arg('input') input: CreatePostInput): Promise<PostModel> {
    return this.createPostUseCase.execute(input)
  }

  @Query(() => [Post], { description: 'Listar todos os posts' })
  getPosts(): Promise<PostModel[]> {
    return this.getPostsUseCase.execute()
  }

  @Mutation(() => String)
  deletePost(@Arg('postId') postId: string): Promise<string> {
    return this.deletePostUseCase.execute(postId)
  }

  @Mutation(() => Post)
  updatePost(@Arg('input') input: UpdatePostInput): Promise<PostModel> {
    return this.updatePostContentUseCase.execute(input)
  }
}
