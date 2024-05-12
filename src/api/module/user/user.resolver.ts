import { Arg, Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { AuthenticateUser, CreateUserInput } from './user.input'
import { AuthenticatedUser, User } from './user.type'
import { CreateUserUseCase } from '@domain/user'
import { AuthenticatedUserModel, UserModel } from '@domain/model'
import { AuthenticateUserUseCase } from '@domain/user/authenticate.use-case'

@Service()
@Resolver()
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Mutation(() => User, { description: 'Cria um usuário' })
  createUser(@Arg('input') input: CreateUserInput): Promise<UserModel> {
    return this.createUserUseCase.execute(input)
  }

  @Mutation(() => AuthenticatedUser, { description: 'Faz autenticação de um usuário' })
  signIn(@Arg('input') input: AuthenticateUser): Promise<AuthenticatedUserModel> {
    return this.authenticateUserUseCase.execute(input)
  }
}
