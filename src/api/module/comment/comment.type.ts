import { UserModel } from '@domain/model'
import { CommentModel } from '@domain/model/comment.model'
import { Field, ObjectType } from 'type-graphql'
import { User } from '../user/user.type'

@ObjectType()
export class Comment implements CommentModel {
  @Field()
  id: string

  @Field({ description: 'Conteúdo do comentário' })
  content: string

  @Field(() => User, { description: 'Criador do comentário' })
  user: UserModel
}
