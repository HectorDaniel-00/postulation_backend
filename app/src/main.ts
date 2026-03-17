import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptor';
import { AuthJwtGuard } from './auth/guard/jwt.guards';
import { AllExceptionsFilter } from './common/filter/all-exceptions.filter';
import { setupSwagger } from './config/swagger.config';
import { AuthRoleGuard } from './common/guard/role.guard';
import { ApikeyGuard } from '@common/guard/apikey.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.APP_PORT ?? 3000;
  const logger = new Logger(bootstrap.name);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalGuards(
    new ApikeyGuard(),
    new AuthJwtGuard(app.get(Reflector)),
    new AuthRoleGuard(app.get(Reflector)),
  );
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));
  app.setGlobalPrefix('api');
  setupSwagger(app);
  await app.listen(PORT);
  logger.log(`Servidor expuesto en: http://localhost:${PORT}/api`);
  logger.log(
    `Documentacion de la API expuesta en: http://localhost:${PORT}/api-docs`,
  );
}
bootstrap();
