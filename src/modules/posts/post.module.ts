import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { HttpModule, Module } from '@nestjs/common';import { RepoModule } from 'src/models/repo.module';
import { PostController } from './post.controller';
import PostService from './post.service';
import * as dotenv from 'dotenv';
import PostRabbitService from './post-rabbit.service';
dotenv.config()

@Module({
  imports: [RepoModule, HttpModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'dot-test',
          type: 'topic',
        },
      ],
      uri: `amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PASS}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`,
      connectionInitOptions: {
        wait: true
      }
    })
  ],
  controllers: [PostController],
  providers: [PostService, PostRabbitService],
})
export class PostModule {}
