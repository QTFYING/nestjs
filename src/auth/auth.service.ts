import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { RedisService } from 'src/common/redis/redis.service';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepo: Repository<AuthEntity>,
    private readonly JwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  // 注册
  async signup(params: CreateAuthDto) {
    const targetUser = await this.authRepo.findOneBy({
      username: params.username,
    });
    if (targetUser && targetUser.username === params.username) {
      return '用户已存在';
    }
    // 对密码进行加密处理
    params.password = bcryptjs.hashSync(params.password, 10);
    await this.authRepo.save(params);
    //  存入 redis
    this.redisService.set(params.username, params.password);
    return '注册成功';
  }

  // 登录
  async login(params: CreateAuthDto) {
    const targetUser = await this.authRepo.findOneBy({
      username: params.username,
    });

    if (!targetUser) {
      return new BadRequestException('用户不存在');
    }

    const compareResult: boolean = bcryptjs.compareSync(
      params.password,
      targetUser.password,
    );

    if (!compareResult) return new BadRequestException('密码错误');
    const payload = { username: targetUser.username };

    return {
      access_token: this.JwtService.sign(payload),
      message: '登录成功',
    };
  }
}
