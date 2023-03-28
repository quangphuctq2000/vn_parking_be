import { Module } from '@nestjs/common';
import { MonthParkingController } from './month_parking.controller';
import { MonthParkingService } from './month_parking.service';
import { ParkingStationsModule } from '../parking_stations/parking_stations.module';
import { VehicleModule } from '../vehicle/vehicle.module';

@Module({
    controllers: [MonthParkingController],
    providers: [MonthParkingService],
    imports: [ParkingStationsModule, VehicleModule],
    exports: [MonthParkingService],
})
export class MonthParkingModule {}
