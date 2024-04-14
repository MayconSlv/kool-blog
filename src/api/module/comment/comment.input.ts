import { CommentModel, CreateCommentInputModel, UpdateCommentModel } from '@domain/model/comment.model'
import { IsString, IsUUID } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateCommentInput {
  @Field()
  @IsString()
  content: string

  @Field()
  @IsString()
  postId: string
}

@InputType()
export class UpdateCommentInput implements UpdateCommentModel {
  @Field()
  @IsUUID()
  @IsString()
  id: string

  @Field()
  @IsString()
  content: string
}
