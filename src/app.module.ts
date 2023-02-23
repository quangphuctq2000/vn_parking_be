import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { ParkingStationsModule } from './modules/parking_stations/parking_stations.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, ConfigModule, DatabaseModule, ParkingStationsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
