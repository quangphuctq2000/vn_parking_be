import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ParkingStationsController } from './parking_stations.controller';
import { ParkingStationsService } from './parking_stations.service';
import { AuthMiddleware } from '../../helpers/authenticationMiddleware';

@Module({
  controllers: [ParkingStationsController],
  providers: [ParkingStationsService],
})
export class ParkingStationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'parking-stations', method: RequestMethod.POST },
        // { path: 'parking-stations', method: RequestMethod.GET },
        { path: 'parking-stations/:id', method: RequestMethod.GET },
      );
  }
}
