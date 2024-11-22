import { Injectable } from '@nestjs/common';
import pinyin from 'pinyin';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly appService: PrismaClient) {}

  getHello(): string {
    return 'Hello World!';
  }

  getPinYin(text: string): string {
    return pinyin(text, { style: 'normal' }).join('');
  }
}
