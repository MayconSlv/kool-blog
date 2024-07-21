import { CreatedGroupModel } from '@domain/model'
import { Field, ObjectType } from 'type-graphql'

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
