import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({}));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.npm_package_version,
  });

  app.enableCors({ origin: '*' });

  const documentBuilder = new DocumentBuilder()
    .setTitle(process.env.npm_package_name)
    .setDescription('')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
  Logger.log(`App is running on: ${await app.getUrl()}`);
})();
