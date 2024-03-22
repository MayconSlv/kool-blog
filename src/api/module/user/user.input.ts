import { IsDate, IsEmail, IsString } from 'class-validator'
import { CreateUserInputModel } from 'domain/model'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateUserInput implements CreateUserInputModel {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  username: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  password: string

  @Field()
  @IsDate()
  birthDate: Date
}
