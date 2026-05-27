import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ limit: '20mb', extended: true }));

  // CORS — use CORS_ORIGIN env var (comma-separated list) or '*' as fallback.
  // In production set: CORS_ORIGIN=https://bakaninha.netlify.app,https://www.bakaninha.com.br
  const corsEnv = process.env.CORS_ORIGIN?.trim();
  const corsOrigin: string | string[] = corsEnv
    ? corsEnv.split(',').map(s => s.trim()).filter(Boolean)
    : '*';
  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Serve uploaded files statically
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Bakaninha API running on port ${port}`);
}
bootstrap();
