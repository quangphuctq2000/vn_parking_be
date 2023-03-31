import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { VehicleModule } from '../vehicle/vehicle.module';

@Module({
    controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService],
    imports: [VehicleModule],
})
export class BookingModule {}
