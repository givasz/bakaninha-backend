import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as sharp from 'sharp';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const uploadsDir = 'uploads';
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      // Recebe em memória para processar com sharp antes de gravar.
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\//)) return cb(new Error('Apenas imagens'), false);
        cb(null, true);
      },
      limits: { fileSize: 20 * 1024 * 1024 },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Nenhum arquivo enviado');

    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const buffer = await sharp(file.buffer)
      .rotate() // respeita a orientação EXIF (fotos de celular)
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    await writeFile(join(uploadsDir, filename), buffer);
    return { url: `/uploads/${filename}`, filename };
  }
}
