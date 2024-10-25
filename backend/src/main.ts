import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_ENV_ENUM } from './common/constants/environment';
import { swaggerSetup } from './swagger/setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  if (configService.get('APP_ENV') !== APP_ENV_ENUM.PRODUCTION) {
    swaggerSetup(app);
  }

  const PORT = configService.get('APP_PORT') || 3000;

  await app.listen(PORT);
  console.log('App started on port', PORT);
}
bootstrap();
