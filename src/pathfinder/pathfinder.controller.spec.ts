import { Test, TestingModule } from '@nestjs/testing';
import { PathfinderController } from './pathfinder.controller';

describe('PathfinderController', () => {
  let controller: PathfinderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PathfinderController],
    }).compile();

    controller = module.get<PathfinderController>(PathfinderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
