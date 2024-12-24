import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      return new BadRequestException(
        errors.map(err => ({
          field: err.property,
          error: Object.values(err.constraints)[0] // Custom message
        }))
      );
    }
  }));
  dotenv.config();

  // Enable CORS
  app.enableCors({
    origin: '*', // Replace with your Angular app URL
    methods: '*',
    credentials: true, // Enable credentials if needed
  });
  
  await app.listen(5001); // Change to your preferred port
}
bootstrap();
