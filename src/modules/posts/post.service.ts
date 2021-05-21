import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { HttpService, Injectable } from "@nestjs/common";
import RepoService from "src/models/repo.service";
import { ApiResponse } from "./dto/post.dto";

@Injectable()
export default class PostService {
  
    public constructor(
        private readonly repoService: RepoService,
        private readonly httpService: HttpService,
        private readonly amqpConnection: AmqpConnection,
    ){}

    async syncPosts(){
        try {
            const get = await this.httpService.get(
                process.env.API_URL + '/posts'
            ).toPromise();  

            if(get.data && get.data.length > 0){
                for await(let api_response of get.data){
                    this.publishToRabbit(api_response, 'sync')
                }
            }

            return {
                status: 200,
                data: get.data
            }
        } catch (error) {
            console.error(error)
            return {
                status: 500,
                error_message: 'FAILED_FETCH_DATA'
            }
        }
    }


    async getPosts(){

    }

    async getPost(){

    }
    
    async createPost(data){
        
    }

    async patchPost(data){
        
    }

    async deletePosts(data){
        
    }

    async updatePost(data){
        
    }

    async publishToRabbit(data: ApiResponse, routing_key){
        let publish = await this.amqpConnection.publish('dot-test', routing_key, {
            data
        });
        return true
    }

}
