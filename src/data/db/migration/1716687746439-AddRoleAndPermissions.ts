import { Roles } from '@domain/model'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRoleAndPermissions1716687746439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO role (name) VALUES ('${Roles.admin}'), ('${Roles.moderador}'), ('${Roles.user}')`,
    )
    await queryRunner.query(`INSERT INTO permission (name) VALUES ('create'), ('read'), ('update'), ('delete')`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM role WHERE name IN ('${Roles.admin}'), ('${Roles.moderador}'), ('${Roles.user}')`,
    )
    await queryRunner.query(
      `DELETE FROM permission WHERE name IN (name) VALUES (create), ('read'), ('update'), ('delete')`,
    )
  }
}
