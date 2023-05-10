import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { VehicleModule } from '../vehicle/vehicle.module';
import { ParkingStationsModule } from '../parking_stations/parking_stations.module';

@Module({
    controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService],
    imports: [ParkingStationsModule],
})
export class BookingModule {}
