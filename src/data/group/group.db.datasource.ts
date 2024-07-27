import { DBConnection } from '@data/db/config'
import { GroupEntity, UserEntity } from '@data/db/entity'
import { GroupModel, UserModel } from '@domain/model'
import { Service } from 'typedi'
import { Repository } from 'typeorm'

interface CreateGroupInput {
  name: string
  description: string
  userCreator: UserModel
}

@Service()
export class GroupDbDataSource {
  private readonly repository: Repository<GroupEntity> = DBConnection.getRepository(GroupEntity)

  create(data: CreateGroupInput): Promise<GroupModel> {
    return this.repository.save(data)
  }

  findMany(): Promise<GroupModel[]> {
    return this.repository.find()
  }
}
