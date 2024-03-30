import { CreateCommentInputModel } from '@domain/model/comment.model'
import { IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateCommentInput implements CreateCommentInputModel {
  @Field()
  @IsString()
  content: string

  @Field()
  @IsString()
  postId: string

  @Field()
  @IsString()
  username: string
}
