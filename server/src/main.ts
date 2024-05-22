import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors'

async function start() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cors({ origin: true, credentials: true }))

  const config = new DocumentBuilder()
    .setTitle('Trello clone')
    .setDescription('REST API Docs')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(7000);
}

start();