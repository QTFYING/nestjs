import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { PostsEntity } from 'src/posts/entities/posts.entity';

export const ormConnectOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    entities: [AuthEntity, PostsEntity],
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 3306),
    username: configService.get('DB_USER', 'root'),
    password: configService.get('DB_PASSWORD', '123456'),
    database: configService.get('DB_DATABASE', 'mydatabase'),
    timezone: '+08:00', // 时区
    synchronize: true, // 根据实体自动穿箭数据库表，生产环境关闭
  }),
};
