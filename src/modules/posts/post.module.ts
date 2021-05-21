import { Module } from '@nestjs/common';import { RepoModule } from 'src/models/repo.module';
import { PostController } from './post.controller';
import PostService from './post.service';

@Module({
  imports: [RepoModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
