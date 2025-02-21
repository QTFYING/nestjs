import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWindow } from 'domino';
import puppeteer from 'puppeteer';
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

  // 拉取掘金热门文章
  async getHotPostsOfJueJin() {
    let hotJueJinData: any[] = []; //存储数据
    const fetchHTMLWithPuppeteer = async (url: string): Promise<string> => {
      const browser = await puppeteer.launch({
        //  executablePath: '/usr/bin/chromium-browser', // 指定 Chromium 路径,服务器部署需要
        headless: true,
        args: [
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--no-first-run',
          '--no-sandbox',
          '--no-zygote',
          '--single-process',
        ],
      });

      const page = await browser.newPage(); //打开无头浏览器浏览器
      await page.goto(url, { waitUntil: 'networkidle2' }); // 等待页面加载完成
      const html = await page.content(); // 获取渲染后的 HTML
      await browser.close(); //关闭浏览器
      return html;
    };

    const parseHTML = (
      html: string,
      selector: string,
      href?: string,
    ): any[] => {
      const window = createWindow(html);
      const document = window.document;
      const elements = document.querySelectorAll(selector);
      if (!href)
        return Array.from(elements).map((element: any) =>
          element.textContent.trim(),
        );
      if (href)
        return Array.from(elements).map((element: any) =>
          element.getAttribute(href),
        );
    };

    const url = 'https://juejin.cn/hot';
    const html = await fetchHTMLWithPuppeteer(url);
    const title = parseHTML(html, '.article-title');
    const hot = parseHTML(html, '.hot-number');
    const href = parseHTML(html, '.article-item-link', 'href');

    hotJueJinData = title.map((item, index) => {
      return {
        note: item,
        num: hot[index],
        href: 'https://juejin.cn' + href[index],
        type: 'juejin',
      };
    });

    console.log('掘金', hotJueJinData);
    return hotJueJinData;
  }
}
