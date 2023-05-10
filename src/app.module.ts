import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ParkingStationsModule } from './modules/parking_stations/parking_stations.module';
import { DatabaseModule } from './database/database.module';
import { ParkingModule } from './modules/parking/parking.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { BookingModule } from './modules/booking/booking.module';
import { MonthParkingModule } from './modules/month_parking/month_parking.module';
import { UsersModule } from './modules/users/users.module';
@Module({
    imports: [
        AuthModule,
        ParkingStationsModule,
        DatabaseModule,
        ParkingModule,
        VehicleModule,
        BookingModule,
        MonthParkingModule,
        UsersModule,
    ],
    providers: [AppService],
})
export class AppModule {}
