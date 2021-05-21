import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Posts } from "./entities/post.entity";

@Injectable()
class RepoService {
  /**
   * All Models are injected here
   * You can create a new Injected model here
   */
  public constructor(
    @InjectRepository(Posts) public readonly postRepo: Repository<Posts>
  ) {}
}

export default RepoService;
