import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Позволяваме на браузъра да комуникира със сървъра без ограничения
  app.enableCors();

  await app.listen(3000);
}
bootstrap();