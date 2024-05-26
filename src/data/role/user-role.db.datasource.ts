import { DBConnection } from '@data/db/config'
import { UserRolesEntity } from '@data/db/entity/user-roles.entity'
import { UserRoleInputModel, UserRoleModel } from '@domain/model'
import { Service } from 'typedi'
import { Repository } from 'typeorm'

@Service()
export class UserRoleDbDataSource {
  private readonly repository: Repository<UserRolesEntity> = DBConnection.getRepository(UserRolesEntity)

  createUserRole(input: UserRoleInputModel): Promise<UserRoleModel> {
    return this.repository.save({
      user: { id: input.userId },
      role: { id: input.roleId },
    })
  }

  findByUserId(userId: string): Promise<UserRoleModel[]> {
    return this.repository
      .createQueryBuilder('user_role')
      .innerJoinAndSelect('user_role.user', 'user')
      .innerJoinAndSelect('user_role.role', 'role')
      .where('user.id = :userId', { userId })
      .getMany()
  }
}
