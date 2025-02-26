import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { envConfig, ormConnectOptions } from './common/config';
import { RedisModule } from './common/redis/redis.module';
import { RedisService } from './common/redis/redis.service';
import { PostsModule } from './posts/posts.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    TypeOrmModule.forRootAsync(ormConnectOptions),
    PostsModule,
    AuthModule,
    RedisModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard }, // 鉴权
    RedisService,
  ],
})
export class AppModule {}
