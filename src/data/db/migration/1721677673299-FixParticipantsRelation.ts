import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixParticipantsRelation1721677673299 implements MigrationInterface {
  name = 'FixParticipantsRelation1721677673299'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "participants_groups" ("groupId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_2fbdf84830deba4481f9bf63b73" PRIMARY KEY ("groupId", "userId"))`,
    )
    await queryRunner.query(`CREATE INDEX "IDX_41d83c9bb9d5652e144dca6fff" ON "participants_groups" ("groupId") `)
    await queryRunner.query(`CREATE INDEX "IDX_f8f5c7fc4e6e957de1eb921d71" ON "participants_groups" ("userId") `)
    await queryRunner.query(
      `CREATE TABLE "user_groups_group" ("userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_98d481413dbe5578ad2a45ab863" PRIMARY KEY ("userId", "groupId"))`,
    )
    await queryRunner.query(`CREATE INDEX "IDX_84ff6a520aee2bf2512c01cf46" ON "user_groups_group" ("userId") `)
    await queryRunner.query(`CREATE INDEX "IDX_8abdfe8f9d78a4f5e821dbf620" ON "user_groups_group" ("groupId") `)
    await queryRunner.query(
      `ALTER TABLE "participants_groups" ADD CONSTRAINT "FK_41d83c9bb9d5652e144dca6fffc" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "participants_groups" ADD CONSTRAINT "FK_f8f5c7fc4e6e957de1eb921d71b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203"`)
    await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462"`)
    await queryRunner.query(`ALTER TABLE "participants_groups" DROP CONSTRAINT "FK_f8f5c7fc4e6e957de1eb921d71b"`)
    await queryRunner.query(`ALTER TABLE "participants_groups" DROP CONSTRAINT "FK_41d83c9bb9d5652e144dca6fffc"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_8abdfe8f9d78a4f5e821dbf620"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_84ff6a520aee2bf2512c01cf46"`)
    await queryRunner.query(`DROP TABLE "user_groups_group"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_f8f5c7fc4e6e957de1eb921d71"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_41d83c9bb9d5652e144dca6fff"`)
    await queryRunner.query(`DROP TABLE "participants_groups"`)
  }
}
