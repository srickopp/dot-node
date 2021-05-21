import {MigrationInterface, QueryRunner} from "typeorm";

export class createPostCommentsTable1621607258659 implements MigrationInterface {
    name = 'createPostCommentsTable1621607258659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts_comments" ("id" integer NOT NULL, "postId" integer NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(100) NOT NULL, "body" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "post_id" integer, CONSTRAINT "PK_339f9b718824a822ec1b4ff4abc" PRIMARY KEY ("id", "postId"))`);
        await queryRunner.query(`ALTER TABLE "posts_comments" ADD CONSTRAINT "FK_14c9080415c397e35453e432980" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_comments" DROP CONSTRAINT "FK_14c9080415c397e35453e432980"`);
        await queryRunner.query(`DROP TABLE "posts_comments"`);
    }

}
