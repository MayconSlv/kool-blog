import { DBConnection } from '@data/db/config'
import { RoleEntity } from '@data/db/entity'
import { RoleModel, Roles } from '@domain/model'
import { Service } from 'typedi'
import { Repository } from 'typeorm'

@Service()
export class RoleDbDataSource {
  private readonly repository: Repository<RoleEntity> = DBConnection.getRepository(RoleEntity)

  findByName(name: Roles): Promise<RoleModel> {
    return this.repository.findOneOrFail({ where: { name } })
  }
}
