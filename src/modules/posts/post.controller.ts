import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";
import PostService from "./post.service";

@Controller('posts')
export class PostController {
    constructor(
        private readonly postService: PostService
    ){}

    @Get('/sync')
    async sync(@Res() res: Response){
        const get = await this.postService.syncPosts();
        return res.status(get.status).send({
            message: get.error_message,
            data: get.data
        })
    }
}
