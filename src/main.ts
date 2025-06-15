import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  const configService = app.get(ConfigService);
  
  // Set global prefix
  const apiPrefix = configService.get<string>('API_PREFIX', 'api');
  app.setGlobalPrefix(apiPrefix);
  
  // Enable CORS
  app.enableCors();
  
  // Set global pipes, filters and interceptors
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: false,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  
  // Swagger documentation setup
  const options = new DocumentBuilder()
    .setTitle('PRINTOCARE API')
    .setDescription('API documentation for Press Inspection Software')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access_token',
    )
    .build();

    const corsOptions: CorsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    };
    app.enableCors(corsOptions);

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
      swaggerOptions: {
        docExpansion: 'none', // This line ensures all docs are collapsed by default
        persistAuthorization: true, // This will persist authorization between page reloads
      },
  });
  
  // Start the application
  const port = configService.get<number>('PORT', 4000);
  await app.listen(port);
  console.log(`Application is running on: https://pressinspection.sg/${apiPrefix}`);
  console.log(`Swagger documentation is available at: http://localhost:${port}/${apiPrefix}/docs`);
}
bootstrap();