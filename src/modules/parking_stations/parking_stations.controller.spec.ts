import { Test, TestingModule } from '@nestjs/testing';
import { ParkingStationsController } from './parking_stations.controller';

describe('ParkingStationsController', () => {
  let controller: ParkingStationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingStationsController],
    }).compile();

    controller = module.get<ParkingStationsController>(ParkingStationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
