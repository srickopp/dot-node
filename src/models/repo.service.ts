import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostComment } from "./entities/post-comment.entity";
import { Posts } from "./entities/post.entity";

@Injectable()
class RepoService {
  /**
   * All Models are injected here
   * You can create a new Injected model here
   */
  public constructor(
    @InjectRepository(Posts) public readonly postRepo: Repository<Posts>,
    @InjectRepository(PostComment) public readonly postCommentRepo: Repository<PostComment>
  ) {}
}

export default RepoService;
