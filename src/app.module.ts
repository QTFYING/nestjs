import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PrismaClient } from '@prisma/client';
import { envConfig, ormConnectOptions } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    TypeOrmModule.forRootAsync(ormConnectOptions),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
