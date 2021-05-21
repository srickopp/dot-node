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
        queue: 'post-sync',
    })
    async syncData(rabbit_data){
        /** Sync data */
        const data: ApiResponse = rabbit_data.data;
        const find = await this.repoService.postRepo.count({
            id: data.id
        });

        if(find){
            // Update data
            await this.repoService.postRepo.update({
                id: data.id
            },{
                userId: data.userId,
                body: data.body,
                title: data.title
            });
        }else {
            // Create data
            await this.repoService.postRepo.save({
                ...data
            });
        }
        return true;
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'create',
        queue: 'post-create',
    })
    async createData(rabbit_data){
        console.log(rabbit_data)
        return true;
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'update',
        queue: 'post-update',
    })
    async updatedData(rabbit_data){
        console.log(rabbit_data)
        return true;
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'patch',
        queue: 'post-patch',
    })
    async patchData(rabbit_data){
        console.log(rabbit_data)
        return true;
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'delete',
        queue: 'post-delete',
    })
    async deleteData(rabbit_data){
        console.log(rabbit_data)
        return true;
    }

}
