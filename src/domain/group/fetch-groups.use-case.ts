import { GroupDbDataSource } from '@data/group/group.db.datasource'
import { UserDbDataSource } from '@data/user'
import { GroupModel } from '@domain/model'
import { Service } from 'typedi'

@Service()
export class FetchGroupsUseCase {
  constructor(private readonly groupDbDataSource: GroupDbDataSource) {}

  execute(): Promise<GroupModel[]> {
    return this.groupDbDataSource.findMany()
  }
}
