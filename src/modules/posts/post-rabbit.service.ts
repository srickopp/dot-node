import { AmqpConnection, RabbitRPC } from "@golevelup/nestjs-rabbitmq";
import { HttpService, Injectable } from "@nestjs/common";
import RepoService from "src/models/repo.service";
import { ApiResponse, CreatePost, PatchPost, UpdatePost } from "./dto/post.dto";

@Injectable()
export default class PostRabbitService {
  
    public constructor(
        private readonly repoService: RepoService,
        private readonly amqpConnection: AmqpConnection,
        private readonly httpService: HttpService
    ){}

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'sync',
        queue: 'post-sync',
    })
    async syncData(msg){
        if(msg.data != null) {
            const get = await this.httpService.get(
                process.env.API_URL + '/posts/' +msg.data.id
            ).toPromise();  
            console.log(`---- GET POST WITH ID: ${msg.data.id} ----`)
            console.log(get.data)
            return true;
        }
        const get = await this.httpService.get(
            process.env.API_URL + '/posts'
        ).toPromise();  

        if(get.data && get.data.length > 0){
            for await(let data of get.data){
                /** Sync data */
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
            }
        }
        
        const getPosts = await this.repoService.postRepo.find({
            order:{
                id: 'ASC'
            }
        });

        console.log('--------- SYNC DATA ----------')
        console.log(getPosts);
        return true;
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'comment',
        queue: 'post-comment',
    })
    async postComment(msg){
        try {
            const get = await this.httpService.get(
                process.env.API_URL + '/posts/' +msg.data.id +'/comments'
            ).toPromise();  
            console.log(`---- GET POST COMMENT WITH ID POST: ${msg.data.id} ----`);
    
            if(get.data && get.data.length > 0){
                for await(let data of get.data){
                    /** Sync data */
                    const find = await this.repoService.postCommentRepo.count({
                        id: data.id
                    });
            
                    if(find){
                        // Update data
                        await this.repoService.postCommentRepo.update({
                            id: data.id
                        },{
                            postId: data.postId,
                            name: data.name,
                            email: data.email,
                            body: data.body
                        });
                    }else {
                        // Create data
                        await this.repoService.postCommentRepo.save({
                            ...data
                        });
                    }
                }
            }
            
            const getPostComments = await this.repoService.postCommentRepo.find({
                where:{
                    postId: msg.data.id
                },
                order:{
                    id: 'ASC'
                }
            });
            console.log(getPostComments);
            return true;
        } catch (error) {
            console.log('--- SERVER ERROR || Invalid ID ---')
            return true;
        }
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'create',
        queue: 'post-create',
    })
    async createData(rabbit_data){
        const data: CreatePost = rabbit_data.data;

        const create_data = await this.httpService.post(
            process.env.API_URL + '/posts/', {
                ...data
            }
        ).toPromise();
        // Create Data;
        const createPost = await this.repoService.postRepo.save(create_data.data);
        console.log('--- CREATED POST ---')
        console.log(createPost)
        return true;
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'update',
        queue: 'post-update',
    })
    async updatedData(rabbit_data){
        const data = rabbit_data.data;
        console.log('--- UPDATE POST ---')
        const id = data.id;
        try {
            const updateData = await this.httpService.put(
                process.env.API_URL + '/posts/'+id, {
                    ...data
                }
            ).toPromise();
            // Update the data
            const update_data = await this.repoService.postRepo.update({
                id: updateData.data.id
            },{
                userId: updateData.data.userId,
                title: updateData.data.title,
                body: updateData.data.body
            });
    
            if(update_data.affected > 0){
                const updated_data = await this.repoService.postRepo.findOne({
                    id
                });
                console.log(updated_data)
                return true
            }
    
            console.log('--- DATA NOT FOUND ---')
            return true;
        } catch (error) {
            console.log('--- FAILED UPDATE SERVER ERROR || Invalid ID ---')
            return true;

        }
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'patch',
        queue: 'post-patch',
    })
    async patchData(rabbit_data){
        const data = rabbit_data.data;
        const id = data.id;
        console.log('--- PATCH POST ---')
        try {
            const updateData = await this.httpService.patch(
                process.env.API_URL + '/posts/'+id, {
                    ...data
                }
            ).toPromise();
            // Update the data
            const findData = await this.repoService.postRepo.findOne({
                id
            });
    
            if(!findData){
                return true;
            }
            // Update the data
            await this.repoService.postRepo.update({
                id: id
            },{
                userId: data.userId ?? findData.userId,
                title: data.title ?? findData.title,
                body: data.body ?? findData.body
            });
            const patchedData = await this.repoService.postRepo.findOne({id});
            console.log(patchedData)
            return true;
        } catch (error) {
            console.log('--- FAILED UPDATE SERVER ERROR || Invalid ID ---')
            return true;
        }
    }

    @RabbitRPC({
        exchange: 'dot-test',
        routingKey: 'delete',
        queue: 'post-delete',
    })
    async deleteData(rabbit_data){
        const id = rabbit_data.data.id;
        // Find data
        try {
            const deleteData = await this.httpService.delete(
                process.env.API_URL + '/posts/'+id,
            ).toPromise();
            console.log(`--- DELETE POST WITH ID: ${id} ---`)
            const getData = await this.repoService.postRepo.count({id});
            if(getData > 0){
                // Delete data
                await this.repoService.postRepo.delete({id})
                console.log('--- SUCCESS DELETED DATA ---')
                return true;
            }
            console.log('--- DATA NOT FOUND ---')
            return true;
        } catch (error) {
            console.log('--- FAILED UPDATE SERVER ERROR || Invalid ID ---')
            return true;
        }
    }

}
