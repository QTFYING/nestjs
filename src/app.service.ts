import { Injectable } from '@nestjs/common';
import pinyin from 'pinyin';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }

  getPinYin(text: string): string {
    return pinyin(text, { style: 'normal' }).join('');
  }
}
