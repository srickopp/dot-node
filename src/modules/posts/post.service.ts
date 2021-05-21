import { Injectable } from "@nestjs/common";
import RepoService from "src/models/repo.service";

@Injectable()
export default class PostService {
  
    public constructor(
        private readonly repoService: RepoService
    ){}

}
