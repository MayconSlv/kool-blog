import { CreatedGroupModel, GroupModel, UserModel } from '@domain/model'
import { Field, ObjectType } from 'type-graphql'
import { User } from '../user/user.type'
import { IsOptional } from 'class-validator'

@ObjectType()
export class CreatedGroup implements CreatedGroupModel {
  @Field()
  id: string

  @Field({ description: 'Nome do grupo' })
  name: string

  @Field({ description: 'Descrição do grupo' })
  description: string

  @Field({ description: 'ID do criador do grupo' })
  group_creator: string
}

@ObjectType()
export class Group implements GroupModel {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  group_creator: string
}
