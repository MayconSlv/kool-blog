import { Arg, Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Post } from './post.type'
import { CreatePostInput } from './post.input'
import { PostModel } from '@domain/model/post.model'
import { CreatePostUseCase } from '@domain/post'

@Service()
@Resolver()
export class PostResolver {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {}

  @Mutation(() => Post, { description: 'Cria um post' })
  createPost(@Arg('input') input: CreatePostInput): Promise<PostModel> {
    return this.createPostUseCase.execute(input)
  }
}
