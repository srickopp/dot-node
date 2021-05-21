import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostComment } from "./entities/post-comment.entity";
import { Posts } from "./entities/post.entity";
import RepoService from "./repo.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
        Posts,
        PostComment
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
