import { DBConnection } from '@data/db/config'
import { GroupEntity, UserEntity } from '@data/db/entity'
import { CreatedGroupModel, CreateGroupInputModel, GroupModel, UserModel } from '@domain/model'
import { Service } from 'typedi'
import { Repository } from 'typeorm'

@Service()
export class GroupDbDataSource {
  private readonly repository: Repository<GroupEntity> = DBConnection.getRepository(GroupEntity)

  create(data: CreateGroupInputModel): Promise<CreatedGroupModel> {
    const { userCreator } = data

    return this.repository.save({ group_creator: userCreator, ...data })
  }

  findMany(): Promise<GroupModel[]> {
    return this.repository.find()
  }
}
