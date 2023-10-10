import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { existsSync, mkdirSync } from 'fs';
import { storageDir } from '@utils';

function initDirs() {
  if (!existsSync(storageDir)) {
    mkdirSync(storageDir);
  }
}

async function bootstrap() {
  const port: number = Number(process.env.APP_PORT) || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('GIO-AI image generator')
    .setDescription('GIO-AI API description')
    .setVersion('1.0')
    .addTag('ai')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  initDirs();

  await app.listen(port);
  console.log(`App launched on port ${port}...`);
}
bootstrap();
