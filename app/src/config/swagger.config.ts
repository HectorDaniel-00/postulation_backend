import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'API de Postulación de Vacantes')
    .setDescription(
      process.env.SWAGGER_DESCRIPTION ||
        'Esta es la documentación de la API para la gestión de usuarios, roles, vacantes y autenticación.',
    )
    .setVersion(process.env.SWAGGER_VERSION || '1.0.0')
    .addTag('Default')
    .addTag(
      'Auth',
      'Endpoints relacionados con la autenticación y autorización',
    )
    .addTag('Users', 'Gestión de usuarios')
    // .addTag('Roles', 'Gestión de roles y permisos')
    .addTag('Vacancies', 'Gestión de vacantes')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      },
      'x-api-key',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
        description: 'Introduce el token JWT para autenticar las solicitudes',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Documentación API - Postulación Vacantes',
  });
}
