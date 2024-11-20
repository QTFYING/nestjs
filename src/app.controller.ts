import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Post as MyPost } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pinyin/:text')
  getPinYin(@Param('text') text: string): string {
    return this.appService.getPinYin(text);
  }

  @Get()
  async findAll(): Promise<MyPost[]> {
    return this.appService.findAllPosts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MyPost | null> {
    return this.appService.findPostsById(+id);
  }

  @Post()
  async create(
    @Body()
    postData: {
      title: string;
      content?: string;
      published?: boolean;
      authorId: number;
    },
  ): Promise<MyPost> {
    return this.appService.createPosts(postData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateData: { title?: string; content?: string; published?: boolean },
  ): Promise<MyPost | null> {
    return this.appService.updatePosts(+id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MyPost | null> {
    return this.appService.deletePosts(+id);
  }
}
