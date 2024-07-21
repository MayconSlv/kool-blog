import { CreateGroupUseCase } from '@domain/group'
import { CreatedGroupModel } from '@domain/model'
import { Arg, Authorized, Ctx, Mutation } from 'type-graphql'
import { Service } from 'typedi'
import { CreatedGroupInput } from './group.input'
import { CreatedGroup } from './group.type'
import { AuthorizedContextInterface } from '@api/graphql.context'

@Service()
export class GroupResolver {
  constructor(private readonly createGroupUseCase: CreateGroupUseCase) {}

  @Mutation(() => CreatedGroup, { description: 'Cria um grupo ' })
  @Authorized('create')
  createGroup(
    @Arg('input') input: CreatedGroupInput,
    @Ctx() context: AuthorizedContextInterface,
  ): Promise<CreatedGroupModel> {
    return this.createGroupUseCase.exec({ userCreator: context.userId, ...input })
  }
}
