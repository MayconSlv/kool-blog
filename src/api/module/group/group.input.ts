import { IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreatedGroupInput {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  description: string
}
