import { GroupDbDataSource } from '@data/group/group.db.datasource'
import { UserDbDataSource } from '@data/user'
import { CreateGroupInputModel, GroupModel } from '@domain/model'
import { Service } from 'typedi'

@Service()
export class CreateGroupUseCase {
  constructor(
    private readonly userDbDataSource: UserDbDataSource,
    private readonly groupDbDataSource: GroupDbDataSource,
  ) {}

  async exec(input: CreateGroupInputModel): Promise<GroupModel> {
    const { description, name, groupCreator } = input

    const user = await this.userDbDataSource.findById(groupCreator)
    if (!user) {
      throw new Error('user not found')
    }

    return this.groupDbDataSource.create({ name, description, groupCreator: user })
  }
}
