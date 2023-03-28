import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { ParkingLotModule } from '../parking_lots/parking_lots.module';
import { UsersModule } from '../users/users.module';
import { ParkingStationsModule } from '../parking_stations/parking_stations.module';
import { VehicleModule } from '../vehicle/vehicle.module';

@Module({
    controllers: [ParkingController],
    providers: [ParkingService],
    imports: [
        ParkingLotModule,
        UsersModule,
        ParkingStationsModule,
        VehicleModule,
    ],
})
export class ParkingModule {}
