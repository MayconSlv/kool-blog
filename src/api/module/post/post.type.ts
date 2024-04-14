import { UserModel } from '@domain/model'
import { DetailedPostModel, PostModel } from '@domain/model/post.model'
import { Field, ObjectType } from 'type-graphql'
import { User } from '../user/user.type'
import { CommentModel } from '@domain/model/comment.model'
import { Comment } from '../comment/comment.type'

@ObjectType()
export class Post implements PostModel {
  @Field()
  id: string

  @Field({ description: 'Conteúdo do post' })
  content: string

  @Field(() => User, { description: 'Criador do post' })
  user: UserModel
}

@ObjectType()
export class DetailedPost implements DetailedPostModel {
  @Field()
  id: string

  @Field({ description: 'Conteúdo do post' })
  content: string

  @Field(() => User, { description: 'Criador do post' })
  user: UserModel

  @Field(() => [Comment], { description: 'Comentários do post' })
  comments: CommentModel[]
}
