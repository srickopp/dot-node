import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { HttpService, Injectable } from "@nestjs/common";
import RepoService from "src/models/repo.service";
import { ApiResponse, CreatePost } from "./dto/post.dto";

@Injectable()
export default class PostService {
  
    public constructor(
        private readonly repoService: RepoService,
        private readonly httpService: HttpService,
        private readonly amqpConnection: AmqpConnection,
    ){}

    async getPosts(){
        // Sync trigger
        await this.publishToRabbit(null, 'sync')
        return {
            status: 200,
            message: 'Check the terminal now!'
        }
    }

    async getPost(id){
        await this.publishToRabbit({id}, 'sync')
        return {
            status: 200,
            message: 'Check the terminal now!'
        }
    }

    async getPostComments(id){
        await this.publishToRabbit({id}, 'comment')
        return {
            status: 200,
            message: 'Check the terminal now!'
        }
    }
    
    async createPost(data: CreatePost){
        await this.publishToRabbit(data, 'create');
        return {
            status: 200,
            message: 'Check the terminal!'
        }
    }

    async patchPost(data, id){
        data.id = id;
        await this.publishToRabbit(data, 'patch');
        return {
            status: 200,
            message: 'Check the terminal!'
        }
    }

    async deletePosts(id){
        await this.publishToRabbit({id}, 'delete');
        return {
            status: 200,
            message: 'Check the terminal!'
        }
    }

    async updatePost(data, id){
        data.id = id;
        await this.publishToRabbit(data, 'update');
        return {
            status: 200,
            message: 'Check the terminal!'
        }
    }

    async publishToRabbit(data, routing_key){
        let publish = await this.amqpConnection.publish('dot-test', routing_key, {
            data
        });
        return true
    }

}
