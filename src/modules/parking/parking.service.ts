import { Parking } from '@/database/models/parking';
import { Injectable } from '@nestjs/common';
import { DataSource, IsNull } from 'typeorm';

@Injectable()
export class ParkingService {
    private parkingRepository = this.dataSource.getRepository(Parking);
    constructor(private dataSource: DataSource) {}

    async checkIn(parking: Parking) {
        await this.parkingRepository.save(parking);
    }

    async checkOut(vehicleIdentity, parkingStationId) {
        return await this.parkingRepository.findOne({
            where: {
                parkingStation: {
                    id: parkingStationId,
                },
                vehicle: {
                    identityNumber: vehicleIdentity,
                },
                checkOut: IsNull(),
            },
            relations: {
                parkingStation: true,
            },
        });
    }

    async getParkingCarNumber(parkingStationId: number) {
        const parkingCarNumber = await this.parkingRepository.findAndCount({
            where: {
                parkingStation: {
                    id: parkingStationId,
                },
                checkOut: null,
            },
        });
    }

    async checkOutSuccess(parking: Parking) {
        await this.parkingRepository.save(parking);
    }

    async getParking(id: number) {
        return await this.parkingRepository.findOne({
            where: {
                id,
            },
        });
    }
}
