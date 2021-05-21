import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './modules/posts/post.module';
import ormconfig from './ormconfig';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
