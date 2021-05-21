import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import PostService from "./post.service";

@Controller('posts')
export class PostController {
    constructor(
        private readonly postService: PostService
    ){}
}
