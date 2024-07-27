import { MigrationInterface, QueryRunner } from "typeorm";

export class FixGroupRelation1722104984394 implements MigrationInterface {
    name = 'FixGroupRelation1722104984394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "groupCreator"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" ADD "groupCreator" character varying NOT NULL`);
    }

}
