import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remove invalid keys in JSON
      forbidNonWhitelisted: true, //Set error when send invalid keys in JSON
      transform: false, //try to convert the dto and params types if possible
    }),
  );
  await app.listen(3000);
}
bootstrap();
