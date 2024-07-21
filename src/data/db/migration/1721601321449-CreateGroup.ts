import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroup1721601321449 implements MigrationInterface {
    name = 'CreateGroup1721601321449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "description" character varying(200) NOT NULL, "group_creator" character varying NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_name_enum" RENAME TO "user_role_name_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."role_name_enum" AS ENUM('admin', 'moderador', 'user')`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" TYPE "public"."role_name_enum" USING "name"::"text"::"public"."role_name_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_name_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_name_enum_old" AS ENUM('admin', 'moderador', 'user')`);
        await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "name" TYPE "public"."user_role_name_enum_old" USING "name"::"text"::"public"."user_role_name_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_name_enum_old" RENAME TO "user_role_name_enum"`);
        await queryRunner.query(`DROP TABLE "group"`);
    }

}
