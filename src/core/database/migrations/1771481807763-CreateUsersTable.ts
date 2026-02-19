import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1771481807763 implements MigrationInterface {
  name = 'CreateUsersTable1771481807763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "user_id" uuid NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "email" character varying(254) NOT NULL,
        "username" character varying(30) NOT NULL,
        "password" character varying(255) NOT NULL,
        "avatar" character varying(255) NOT NULL,
        "about" character varying(200) NOT NULL,

        CONSTRAINT "uq_users_username" UNIQUE ("username"),
        CONSTRAINT "uq_users_email" UNIQUE ("email"),
        CONSTRAINT "pk_users_user_id" PRIMARY KEY ("user_id"))
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
