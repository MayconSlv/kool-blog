import { UserModel } from '@domain/model'
import { PostModel } from '@domain/model/post.model'
import { Field, ObjectType } from 'type-graphql'
import { User } from '../user/user.type'

@ObjectType()
export class Post implements PostModel {
  @Field({ description: 'Conteúdo do post' })
  content: string

  @Field(() => User, { description: 'Criador do post' })
  user: UserModel
}
