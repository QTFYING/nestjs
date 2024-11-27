import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('files')
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads' }))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file.path);
    return '1234';
  }
}
