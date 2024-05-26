import { DBConnection } from '@data/db/config'
import { PermissionEntity, RoleEntity, RolePermissionsEntity } from '../../data/db/entity'

export async function InsertRolePermissions() {
  const rolePermissionRepository = DBConnection.getRepository(RolePermissionsEntity)
  const roleRepository = DBConnection.getRepository(RoleEntity)
  const permissionRepository = DBConnection.getRepository(PermissionEntity)

  await DBConnection.initialize().then(() => console.log('[Database] Initialized.'))
  console.log('worker is running')

  const roles = await roleRepository.find()

  const [createPermission, readPermission, updatePermission, deletePermission] = await Promise.all([
    await permissionRepository.findOneOrFail({ where: { name: 'create' } }),
    await permissionRepository.findOneOrFail({ where: { name: 'read' } }),
    await permissionRepository.findOneOrFail({ where: { name: 'update' } }),
    await permissionRepository.findOneOrFail({ where: { name: 'delete' } }),
  ])

  for (const role of roles) {
    await rolePermissionRepository.save({ role, permission: createPermission })
    await rolePermissionRepository.save({ role, permission: readPermission })
    await rolePermissionRepository.save({ role, permission: updatePermission })
    await rolePermissionRepository.save({ role, permission: deletePermission })
  }

  console.log('All the permissions have been saved successfully.')
}

InsertRolePermissions()
