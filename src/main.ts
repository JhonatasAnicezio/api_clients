import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://grolet-patisserie.vercel.app', // Permitir requisições apenas dessa origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permite o envio de cookies nas requisições
  });

  await app.listen(3000);
}
bootstrap();
