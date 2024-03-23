import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { CreateUserInput } from './user.input'
import { User } from './user.type'
import { CreateUserUseCase } from '@domain/user'
import { UserModel } from '@domain/model'

@Service()
@Resolver()
export class UserResolver {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Query(() => String)
  helloWorld() {
    return 'hello world'
  }

  @Mutation(() => User, { description: 'Cria um usuário' })
  createUser(@Arg('input') input: CreateUserInput): Promise<UserModel> {
    return this.createUserUseCase.exec(input)
  }
}
