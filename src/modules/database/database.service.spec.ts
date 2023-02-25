import { Test, TestingModule } from '@nestjs/testing';
import { dataSource } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [dataSource],
    }).compile();

    service = module.get<DatabaseService>(dataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
