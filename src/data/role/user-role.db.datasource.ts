import { DBConnection } from '@data/db/config'
import { UserRolesEntity } from '@data/db/entity/user-roles.entity'
import { UserRoleInputModel, UserRoleModel } from '@domain/model'
import { Service } from 'typedi'
import { Repository } from 'typeorm'

@Service()
export class UserRoleDbDataSource {
  private readonly repository: Repository<UserRolesEntity> = DBConnection.getRepository(UserRolesEntity)

  save(input: UserRoleInputModel): Promise<UserRoleModel> {
    return this.repository.save({
      user: { id: input.userId },
      role: { id: input.roleId },
    })
  }
}
