import { DBConnection } from '@data/db/config'
import { PermissionEntity, RoleEntity, RolePermissionsEntity } from '../../data/db/entity'
import Container, { Service } from 'typedi'

@Service()
export class InsertRolePermissions {
  private rolePermissionRepository = DBConnection.getRepository(RolePermissionsEntity)
  private roleRepository = DBConnection.getRepository(RoleEntity)
  private permissionRepository = DBConnection.getRepository(PermissionEntity)

  async run() {
    console.log('worker is running')

    const roles = await this.roleRepository.find()

    const createPermission = await this.permissionRepository.findOneOrFail({ where: { name: 'create' } })
    const readPermission = await this.permissionRepository.findOneOrFail({ where: { name: 'read' } })
    const updatePermission = await this.permissionRepository.findOneOrFail({ where: { name: 'update' } })
    const deletePermission = await this.permissionRepository.findOneOrFail({ where: { name: 'delete' } })

    for (const role of roles) {
      await this.rolePermissionRepository.save({ role, permission: createPermission })
      await this.rolePermissionRepository.save({ role, permission: readPermission })
      await this.rolePermissionRepository.save({ role, permission: updatePermission })
      await this.rolePermissionRepository.save({ role, permission: deletePermission })
    }

    console.log('All the permissions have been saved successfully.')
  }
}

const insertRolePermissions = Container.get(InsertRolePermissions)
insertRolePermissions.run()
