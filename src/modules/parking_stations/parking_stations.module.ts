import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { ParkingStationsController } from './parking_stations.controller';
import { ParkingStationsService } from './parking_stations.service';
import { AuthMiddleware } from '../../helpers/authenticationMiddleware';
import { UsersModule } from '../users/users.module';
import { WebParkingStationsController } from './web.parking_station.controller';

@Module({
    imports: [UsersModule],
    controllers: [ParkingStationsController, WebParkingStationsController],
    providers: [ParkingStationsService],
    exports: [ParkingStationsService],
})
export class ParkingStationsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'web/parking-stations', method: RequestMethod.POST },
                { path: 'web/parking-stations', method: RequestMethod.GET },
                { path: 'web/parking-stations/:id', method: RequestMethod.GET },
            );
    }
}
