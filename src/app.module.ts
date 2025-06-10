import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PathfinderModule } from './pathfinder/pathfinder.module';
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
  }), PathfinderModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
