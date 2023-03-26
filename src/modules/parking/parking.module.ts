import { Module } from '@nestjs/common';
import { ParkingController } from './parking.controller';
import { ParkingService } from './parking.service';
import { ParkingLotModule } from '../parking_lots/parking_lots.module';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [ParkingController],
    providers: [ParkingService],
    imports: [ParkingLotModule, UsersModule],
})
export class ParkingModule {}
