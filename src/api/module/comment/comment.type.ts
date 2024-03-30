import { CommentModel } from '@domain/model/comment.model'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Comment implements CommentModel {
  @Field()
  id: string

  @Field({ description: 'Conteúdo do comentário' })
  content: string
}
