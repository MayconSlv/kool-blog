import { CreatePostInputModel, UpdatePostContentInputModel } from '@domain/model/post.model'
import { IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreatePostInput implements CreatePostInputModel {
  @Field()
  @IsString()
  content: string
}

@InputType()
export class UpdatePostInput implements UpdatePostContentInputModel {
  @Field()
  @IsString()
  id: string

  @Field()
  @IsString()
  content: string
}
