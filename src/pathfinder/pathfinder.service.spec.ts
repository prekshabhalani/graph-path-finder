import { Test, TestingModule } from '@nestjs/testing';
import { PathfinderService } from './pathfinder.service';

describe('PathfinderService', () => {
  let service: PathfinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathfinderService],
    }).compile();

    service = module.get<PathfinderService>(PathfinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
