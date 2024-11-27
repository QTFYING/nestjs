import { Controller, Post, UploadedFile } from '@nestjs/common';
import { UploadBefore } from 'src/common/decorators';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('files')
  @UploadBefore(['.jpg', '.jpeg', '.png', '.gif', '.pdf'])
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file.path);
    return this.uploadService.uploadFile(file);
  }
}
