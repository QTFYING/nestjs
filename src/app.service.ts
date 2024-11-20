import { Injectable } from '@nestjs/common';
import pinyin from 'pinyin';

@Injectable()
export class AppService {
  /**
   * Returns a greeting message
   * @returns A string containing the greeting message "Hello World!"
   */
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Convert Chinese characters to Pinyin
   * @param text - Chinese characters to be converted
   * @returns The converted Pinyin string
   */
  getPinYin(text: string): string {
    const words = pinyin(text, { style: 'normal' }).join('');
    return words;
  }
}
