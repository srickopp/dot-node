import { AmqpConnection, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { HttpService, Injectable } from "@nestjs/common";
import RepoService from "src/models/repo.service";
import { ApiResponse } from "./dto/post.dto";

@Injectable()
export default class PostRabbitService {
  
    public constructor(
        private readonly repoService: RepoService,
        private readonly amqpConnection: AmqpConnection,
    ){}

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'sync',
        queue: 'post-queue',
    })
    async syncData(rabbit_data){
        console.log(rabbit_data)
        return true;
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'create',
        queue: 'post-queue',
    })
    async createData(rabbit_data){
        console.log(rabbit_data)
        return true;
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'update',
        queue: 'post-queue',
    })
    async updatedData(rabbit_data){
        console.log(rabbit_data)
        return true;
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'patch',
        queue: 'post-queue',
    })
    async patchData(rabbit_data){
        console.log(rabbit_data)
        return true;
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'delete',
        queue: 'post-queue',
    })
    async deleteData(rabbit_data){
        console.log(rabbit_data)
        return true;
    }

}
