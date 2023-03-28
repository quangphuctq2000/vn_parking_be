import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateMonthParkingDto } from './month_parkingDto';
import { ValidationPipe } from '@/helpers/validationPipe';
import { ParkingStationsService } from '../parking_stations/parking_stations.service';
import { MonthParkingService } from './month_parking.service';
import { MonthParking } from '@/database/models/monthParking';
import { VehicleService } from '../vehicle/vehicle.service';

@Controller('month-parking')
@ApiTags('Month Parking')
export class MonthParkingController {
    constructor(
        private parkingStationService: ParkingStationsService,
        private monthParkingService: MonthParkingService,
        private vehicleService: VehicleService,
    ) {}
    @Post()
    async createMonthParking(
        @Body(new ValidationPipe()) body: CreateMonthParkingDto,
    ) {
        const existingParkingStation =
            await this.parkingStationService.getParkingStation(
                body.parkingStationId,
            );
        const existingVehicle = await this.vehicleService.get(
            body.vehicleIdentityNumber,
        );
        if (!existingVehicle) throw new BadRequestException();
        if (!existingParkingStation) throw new BadRequestException();
        const parkingStationParkingMonth =
            await this.monthParkingService.getParkingStationMonthParking(
                body.parkingStationId,
                body.month,
            );
        if (
            parkingStationParkingMonth[1] >
            existingParkingStation.parkingLotNumber
        )
            throw new BadRequestException();
        const monthParking = new MonthParking();
        monthParking.month = body.month;
        monthParking.parkingStation = existingParkingStation;
        monthParking.vehicle = existingVehicle;
        await this.monthParkingService.createMonthParking(monthParking);
        return monthParking;
    }
}
