import { DBConnection } from '@data/db/config'
import { RolePermissionsEntity } from '@data/db/entity'
import { RolePermissionModel } from '@domain/model'
import { Service } from 'typedi'
import { Repository } from 'typeorm'

@Service()
export class RolePermissionDbDataSource {
  private readonly repository: Repository<RolePermissionsEntity> = DBConnection.getRepository(RolePermissionsEntity)

  async findByRoleId(roleId: string): Promise<RolePermissionModel[]> {
    return this.repository
      .createQueryBuilder('role_permission')
      .innerJoinAndSelect('role_permission.role', 'role')
      .innerJoinAndSelect('role_permission.permission', 'permission')
      .where('role.id = :roleId', { roleId })
      .getMany()
  }
}
