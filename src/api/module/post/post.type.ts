import { PostModel } from '@domain/model/post.model'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Post implements PostModel {
  @Field({ description: 'Conteúdo do post' })
  content: string
}
