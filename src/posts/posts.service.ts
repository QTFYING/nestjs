import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity } from './entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly repository: Repository<PostsEntity>,
  ) {}

  // 创建文章
  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title } = post;
    if (!title) throw new HttpException('缺少文章标题', 401);
    const doc = await this.repository.findOneBy({ title });
    if (doc) throw new HttpException('文章已存在', 401);
    return await this.repository.save(post);
  }

  // 获取文章列表
  async findAll(query): Promise<{ list: PostsEntity[]; count: number }> {
    const qb = await this.repository.createQueryBuilder('posts');
    qb.where('1 = 1');
    qb.orderBy('posts.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNo = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNo - 1));

    const posts = await qb.getMany();
    return { list: posts, count: count };
  }

  // 获取指定文章
  async findById(id): Promise<PostsEntity> {
    return await this.repository.findOneBy({ id });
  }

  // 更新文章
  async updateById(
    id: number,
    post: Partial<PostsEntity>,
  ): Promise<PostsEntity> {
    const existPost = await this.repository.findOneBy({ id });
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const updatePost = this.repository.merge(existPost, post);
    return this.repository.save(updatePost);
  }

  // 刪除文章
  async remove(id) {
    const existPost = await this.repository.findOneBy({ id });
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.repository.remove(existPost);
  }
}
