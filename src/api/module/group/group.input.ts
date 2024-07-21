import { CreateGroupInputModel } from '@domain/model'
import { IsString } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { Service } from 'typedi'

@InputType()
export class CreatedGroupInput {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  description: string
}
