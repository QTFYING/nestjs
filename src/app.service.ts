import { Injectable } from '@nestjs/common';
import pinyin from 'pinyin';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly appService: PrismaClient) {}

  /**
   * Returns a greeting message
   * @returns A string containing the greeting message "Hello World!"
   */
  getHello(): string {
    return 'Hello World!';
  }

  async findAllPosts() {
    return this.appService.post.findMany();
  }

  async createPosts(data: any) {
    return this.appService.post.create({
      data,
    });
  }

  async findPostsById(id: number) {
    return this.appService.post.findUnique({ where: { id } });
  }

  async updatePosts(id: number, data: any) {
    return this.appService.post.update({ where: { id }, data });
  }

  async deletePosts(id: number) {
    return this.appService.post.delete({ where: { id } });
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
