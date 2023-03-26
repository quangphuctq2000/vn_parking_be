import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ParkingStationsModule } from './modules/parking_stations/parking_stations.module';
import { UsersModule } from './modules/users/users.module';
import { ParkingLotModule } from './modules/parking_lots/parking_lots.module';
import { DatabaseModule } from './database/database.module';
import { ParkingModule } from './modules/parking/parking.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';

@Module({
    imports: [
        AuthModule,
        ParkingStationsModule,
        UsersModule,
        ParkingLotModule,
        DatabaseModule,
        ParkingModule,
        VehicleModule,
    ],
    providers: [AppService],
})
export class AppModule {}
