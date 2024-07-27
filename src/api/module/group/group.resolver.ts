import { CreateGroupUseCase } from '@domain/group'
import { GroupModel } from '@domain/model'
import { Arg, Authorized, Ctx, Mutation, Query } from 'type-graphql'
import { Service } from 'typedi'
import { CreatedGroupInput } from './group.input'
import { CreatedGroup, Group } from './group.type'
import { AuthorizedContextInterface } from '@api/graphql.context'
import { FetchGroupsUseCase } from '@domain/group/fetch-groups.use-case'

@Service()
export class GroupResolver {
  constructor(
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly fetchGroupsUseCase: FetchGroupsUseCase,
  ) {}

  @Mutation(() => CreatedGroup, { description: 'Cria um grupo ' })
  @Authorized('create')
  createGroup(@Arg('input') input: CreatedGroupInput, @Ctx() context: AuthorizedContextInterface): Promise<GroupModel> {
    return this.createGroupUseCase.exec({ userCreator: context.userId, ...input })
  }

  @Query(() => [Group], { description: 'Lista todos os grupos' })
  fetchGroups(): Promise<GroupModel[]> {
    return this.fetchGroupsUseCase.execute()
  }
}
