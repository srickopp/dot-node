import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { CreatePost, PatchPost, UpdatePost } from "./dto/post.dto";
import PostService from "./post.service";

@Controller('posts')
export class PostController {
    constructor(
        private readonly postService: PostService
    ){}

    @Get('/')
    async sync(@Res() res: Response){
        const get = await this.postService.getPosts();
        return res.status(get.status).send({
            message: get.message
        })
    }

    @Get('/:id')
    async getPost(@Param('id') id: number, @Res() res: Response){
        const get = await this.postService.getPost(id);
        return res.status(get.status).send({
            message: get.message
        })
    }

    @Get('/:id/comments')
    async getPostComments(@Param('id') id: number, @Res() res: Response){
        const get = await this.postService.getPostComments(id);
        return res.status(get.status).send({
            message: get.message
        })
    }

    @Post()
    async createData(@Body() body: CreatePost, @Res() res: Response){
        const create = await this.postService.createPost(body);
        return res.status(create.status).send({
            message: create.message
        })
    }

    @Put('/:id')
    async updateData(@Param('id') id: number, @Body() body: UpdatePost, @Res() res: Response){
        const updateData = await this.postService.updatePost(body, id);
        return res.status(updateData.status).send({
            message: updateData.message
        })
    }

    @Patch('/:id')
    async patchData(@Param('id') id: number, @Body() body: PatchPost, @Res() res: Response){
        const patchData = await this.postService.patchPost(body, id);
        return res.status(patchData.status).send({
            message: patchData.message
        })
    }

    @Delete('/:id')
    async deleteData(@Param('id') id: number, @Res() res: Response){
        const deleteData = await this.postService.deletePosts(id);
        return res.status(deleteData.status).send({
            message: deleteData.message
        })
    }
}
