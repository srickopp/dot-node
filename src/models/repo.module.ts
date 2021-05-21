import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Posts } from "./entities/post.entity";
import RepoService from "./repo.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
        Posts
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
