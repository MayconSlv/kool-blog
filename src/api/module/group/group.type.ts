import { GroupModel, UserModel } from '@domain/model'
import { Field, ObjectType } from 'type-graphql'
import { User } from '../user/user.type'
import { IsOptional } from 'class-validator'

@ObjectType()
export class CreatedGroup implements GroupModel {
  @Field()
  id: string

  @Field({ description: 'Nome do grupo' })
  name: string

  @Field({ description: 'Descrição do grupo' })
  description: string

  @Field(() => User, { description: 'ID do criador do grupo' })
  groupCreator: User
}

@ObjectType()
export class Group implements GroupModel {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  description: string

  @Field(() => User)
  groupCreator: User
}
