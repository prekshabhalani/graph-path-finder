import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphModule } from './graph/graph.module';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  WinstonModule.forRoot({
    transports: [
      new transports.Console({
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.simple(),
        ),
      }),
    ],
  }), GraphModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
