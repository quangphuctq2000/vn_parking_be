import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ParkingLotController } from './parking_lots.controller';
import { ParkingLotService } from './parking_lots.service';
import { ParkingStationsModule } from '../parking_stations/parking_stations.module';
import { AuthMiddleware } from '@/helpers/authenticationMiddleware';

@Module({
    controllers: [ParkingLotController],
    providers: [ParkingLotService],
    imports: [ParkingStationsModule],
    exports: [ParkingLotService],
})
export class ParkingLotModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'parking-lots', method: RequestMethod.POST },
                { path: 'parking-lots', method: RequestMethod.GET },
                { path: 'parking-lots/:id', method: RequestMethod.GET },
            );
    }
}
