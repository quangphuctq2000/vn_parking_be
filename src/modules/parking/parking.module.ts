import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { UsersModule } from '../users/users.module';
import { ParkingStationsModule } from '../parking_stations/parking_stations.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { MonthParkingModule } from '../month_parking/month_parking.module';
import { AuthMiddleware } from '@/helpers/authenticationMiddleware';

@Module({
    controllers: [ParkingController],
    providers: [ParkingService],
    imports: [
        UsersModule,
        ParkingStationsModule,
        VehicleModule,
        MonthParkingModule,
    ],
})
export class ParkingModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'parking/checkIn', method: RequestMethod.POST },
                { path: 'parking/checkOut', method: RequestMethod.POST },
                {
                    path: 'parking/checkout-manual-info',
                    method: RequestMethod.POST,
                },
                {
                    path: 'parking/checkout-manual-success',
                    method: RequestMethod.POST,
                },
                { path: 'parking/detail/:id', method: RequestMethod.GET },
            );
    }
}
