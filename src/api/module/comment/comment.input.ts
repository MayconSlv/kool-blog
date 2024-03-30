import { CommentModel, CreateCommentInputModel } from '@domain/model/comment.model'
import { IsString, IsUUID } from 'class-validator'
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

@InputType()
export class UpdateCommentInput implements CommentModel {
  @Field()
  @IsUUID()
  @IsString()
  id: string

  @Field()
  @IsString()
  content: string
}
