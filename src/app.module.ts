import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PathfinderModule } from './pathfinder/pathfinder.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }), PathfinderModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
