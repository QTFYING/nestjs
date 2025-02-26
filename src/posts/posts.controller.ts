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
import { Public } from 'src/common/decorators';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts') // 路由控制器
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getHello(): string {
    return 'hello, welcome to posts';
  }

  // 创建帖子
  @Post('/add')
  async create(@Body() post: CreatePostDto) {
    return await this.postsService.create(post);
  }

  // 获取帖子列表
  @Get('/list')
  async findAll(@Query() query): Promise<any> {
    return await this.postsService.findAll(query);
  }

  // 获取指定帖子详情
  @Get('list/:id')
  async findById(@Param('id') id) {
    return await this.postsService.findById(id);
  }

  // 更新帖子
  @Put('list/:id')
  async update(@Param('id') id, @Body() post) {
    return await this.postsService.updateById(id, post);
  }

  // 删除帖子
  @Delete('list/:id')
  async remove(@Param('id') id) {
    return await this.postsService.remove(id);
  }

  // 拉取掘金热门文章
  @Public()
  @Get('juejin')
  async getHotPostsOfJueJin() {
    return await this.postsService.getHotPostsOfJueJin();
  }
}
