import { GroupDbDataSource } from '@data/group/group.db.datasource'
import { CreatedGroupModel, GroupModel } from '@domain/model'
import { Service } from 'typedi'

@Service()
export class FetchGroupsUseCase {
  constructor(private readonly groupDbDataSource: GroupDbDataSource) {}

  async execute(): Promise<GroupModel[]> {
    const groups = await this.groupDbDataSource.findMany()
    console.log(groups)

    return groups
  }
}
