import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function start() {
  const PORT = process.env.PORT || 7000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Trello clone')
    .setDescription('REST API Docs')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT);
}
start();