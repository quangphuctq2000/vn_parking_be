import { MonthParking } from '@/database/models/monthParking';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MonthParkingService {
    private monthParkingRepository =
        this.dataSource.getRepository(MonthParking);
    constructor(private dataSource: DataSource) {}
    async createMonthParking(monthParking: MonthParking) {
        await this.monthParkingRepository.save(monthParking);
    }

    async getParkingStationMonthParking(
        parkingStationId: number,
        month: number,
    ) {
        return await this.monthParkingRepository.findAndCount({
            where: {
                parkingStation: {
                    id: parkingStationId,
                },
                month: month,
            },
        });
    }

    async getMonthParking(
        month: number,
        parkingStationId: number,
        vehicleIdentityNumber: string,
    ) {
        console.log(month, parkingStationId, vehicleIdentityNumber);

        return await this.monthParkingRepository.findOne({
            where: {
                parkingStation: {
                    id: parkingStationId,
                },
                vehicle: {
                    identityNumber: vehicleIdentityNumber,
                },
                month,
            },
        });
    }
}
