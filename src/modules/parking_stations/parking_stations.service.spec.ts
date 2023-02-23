import { Test, TestingModule } from '@nestjs/testing';
import { ParkingStationsService } from './parking_stations.service';

describe('ParkingStationsService', () => {
  let service: ParkingStationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingStationsService],
    }).compile();

    service = module.get<ParkingStationsService>(ParkingStationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
