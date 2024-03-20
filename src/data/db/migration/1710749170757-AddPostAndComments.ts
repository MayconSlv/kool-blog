import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPostAndComments1710749170757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "Post" (id INT PRIMARY KEY, content VARCHAR(255) NOT NULL, user_id INT NOT NULL,FOREIGN KEY (user_id) REFERENCES "User"(id))',
    )
    await queryRunner.query(
      'CREATE TABLE "Comment" (id INT PRIMARY KEY, content VARCHAR(255) NOT NULL, post_id INT NOT NULL, user_id INT NOT NULL, FOREIGN KEY (post_id) REFERENCES "Post"(id),FOREIGN KEY (user_id) REFERENCES "User"(id))',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE Comment')
    await queryRunner.query('DROP TABLE Post')
  }
}
