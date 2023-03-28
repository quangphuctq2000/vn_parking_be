import { Vehicle } from '@/database/models/vehicle';
import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { DataSource, LessThan, MoreThan } from 'typeorm';

@Injectable()
export class VehicleService {
    private vehicleRepository = this.dataSource.getRepository(Vehicle);
    constructor(private dataSource: DataSource) {}

    async create(vehicle: Vehicle) {
        await this.vehicleRepository.save(vehicle);
    }

    async get(identityNumber: string) {
        return await this.vehicleRepository.findOne({
            where: {
                identityNumber,
            },
        });
    }

    async getParkingVehicle(parkingStationId: number, currentTime: Date) {
        const parkingVehicle = await this.vehicleRepository.find({
            where: [
                {
                    parkings: {
                        id: parkingStationId,
                        checkOut: null,
                    },
                },
                {
                    booking: {
                        from: LessThan(currentTime),
                        to: MoreThan(currentTime),
                        parkingStation: {
                            id: parkingStationId,
                        },
                    },
                },
            ],
        });
        return parkingVehicle;
    }
}
