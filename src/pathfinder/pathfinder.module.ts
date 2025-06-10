import { Module } from '@nestjs/common';
import { PathfinderController } from './pathfinder.controller';
import { PathfinderService } from './pathfinder.service';

@Module({
  controllers: [PathfinderController],
  providers: [PathfinderService]
})
export class PathfinderModule {}
