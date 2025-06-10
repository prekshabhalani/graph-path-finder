import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Winston for system logs
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

    app.use(helmet());
  // Enable CORS for API access
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  })

  // Global prefix for all routes
  app.setGlobalPrefix('api/v1')

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Shortest Path API')
    .setDescription('Backend API for finding shortest paths in network topologies using BFS algorithm')
    .setVersion('1.0')
    .addTag('pathfinder', 'Network topology operations')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  const port = process.env.PORT || 3000
  await app.listen(port)

  console.log(`🚀 Shortest Path API is running on: http://localhost:${port}`)
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`)
  console.log(`🏥 Health Check: http://localhost:${port}/api/v1/graph/health`)
}

bootstrap()
