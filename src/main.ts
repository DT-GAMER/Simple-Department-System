import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GraphQLExceptionFilter } from './common/filters/graphql-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Load configuration
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global filters and interceptors
  app.useGlobalFilters(new GraphQLExceptionFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );

  // Swagger setup for REST APIs only
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tactology REST API')
    .setDescription('API documentation for REST endpoints like login and signup')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Start the server
  await app.listen(port);
  console.log(`GraphQL Playground: http://localhost:${port}/graphql`);
  console.log(`Swagger Docs: http://localhost:${port}/api/docs`);
}

bootstrap();
