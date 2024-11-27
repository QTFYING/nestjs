import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as multer from 'multer';
import * as path from 'path';

export const UploadBefore = (fileTypes: string[]) => {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        dest: 'uploads', // 上传的目标文件夹
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
        storage: multer.diskStorage({
          destination: (_req, _file, callback) => {
            const uploadPath = path.join(__dirname, '..', '..', 'uploads');
            if (!fs.existsSync(uploadPath)) {
              fs.mkdirSync(uploadPath, { recursive: true });
            }
            callback(null, uploadPath); // 目录设置,放在了dist目录下的uploads文件夹里
          },
          filename: (_req, file, callback) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const fileExtension = path.extname(file.originalname);
            callback(null, `${uniqueSuffix}${fileExtension}`); // 设置文件名
          },
        }),
        fileFilter: (_req, file, callback) => {
          const type = path.extname(file.originalname);
          if (fileTypes.includes(type)) {
            return callback(null, true);
          } else {
            return callback(new Error('该文件不是图片，请重新上传'), false);
          }
        },
      }),
    ),
  );
};
