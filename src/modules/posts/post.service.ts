import { AmqpConnection, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
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

    async getPosts(){
        try {
            const get = await this.httpService.get(
                process.env.API_URL + '/posts'
            ).toPromise();

            for (let index = 0; index < 2; index++) {
                this.publishToRabbit(get.data[0])
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

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'post',
        queue: 'post-queue',
    })
    async createPost(rabbit_data){
        console.log(rabbit_data)
        return true;
    }

    async publishToRabbit(data: ApiResponse){
        let publish = await this.amqpConnection.publish('dot-test', 'post', {
            data
        });
        return true
    }

}
