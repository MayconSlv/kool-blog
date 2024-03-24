import { UserModel } from '@domain/model'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User implements UserModel {
  @Field()
  id: string

  @Field({ description: 'Nome do usuário' })
  name: string

  @Field({ description: 'Nome da conta do usuário' })
  username: string

  @Field({ description: 'Email do usuário' })
  email: string

  @Field({ description: 'Data de aniversário' })
  birthDate: Date
}
