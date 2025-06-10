import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Winston for system logs
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Security middlewares
  app.use(helmet());
  app.enableCors();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Graph Pathfinder API')
    .setDescription('Find shortest path in a directed graph with all node details.')
    .setVersion('1.0')
    .addTag('pathfinder')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //Dynamic URL log
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  const address = await app.getUrl();
  app.get(WINSTON_MODULE_NEST_PROVIDER).log(`🚀 App is running at ${address}`);
}
bootstrap();
