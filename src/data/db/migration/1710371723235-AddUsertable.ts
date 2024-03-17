import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUsertable1710371723235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "User" (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, username VARCHAR(255) UNIQUE NOT NULL, email VARCHAR(255) NOT NULL, passwordHash VARCHAR(255) NOT NULL, birthDate DATE)',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "User"')
  }
}
