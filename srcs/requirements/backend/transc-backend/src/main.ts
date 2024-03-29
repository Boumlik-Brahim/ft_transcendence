import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
 
  const corsOptions: CorsOptions = {
    origin: `${process.env.APP_URI}:5173`,
    credentials: true,
  };
  // app.useStaticAssets(join('/','app', 'public'));
  app.use(express.static('public'));
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  // app.setViewEngine('ejs');
  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('transcendance')
    .setDescription('The transcendance API')
    .setVersion('1.0')
    .addTag('chat')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }
  )),
  await app.listen(3000);
}
bootstrap();
