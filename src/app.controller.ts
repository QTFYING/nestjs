import { Controller, Get, Put, Param } from '@nestjs/common';
import { AppService } from './app.service';

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

  @Put('list/:id')
  update() {
    return 'update';
  }
}
