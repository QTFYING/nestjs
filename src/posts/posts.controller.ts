import { PostsService, PostsRo } from './posts.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts') // 路由控制器
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 创建文章
  @Post('/create')
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }

  // 获取所有文章
  @Get('/list')
  async findAll(@Query() query): Promise<PostsRo> {
    return await this.postsService.findAll(query);
  }

  // 获取指定文章
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postsService.findById(id);
  }

  // 更新文章
  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  // 删除文章
  @Delete('id')
  async remove(@Param('id') id) {
    return await this.postsService.remove(id);
  }
}
