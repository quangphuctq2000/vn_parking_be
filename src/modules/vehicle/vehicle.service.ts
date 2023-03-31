import { Vehicle } from '@/database/models/vehicle';
import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { DataSource, Equal, IsNull, LessThan, MoreThan, Not } from 'typeorm';

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
                parkings: {
                    checkOut: IsNull(),
                },
            },
            relations: {
                parkings: true,
            },
        });
    }

    async getVehicle(identityNumber: string) {
        return await this.vehicleRepository.findOne({
            where: {
                identityNumber,
            },
            relations: {
                parkings: true,
            },
        });
    }

    async getVehicleById(id: number) {
        console.log(Number(id));
        console.log(id);

        return await this.vehicleRepository.findOne({
            where: {
                id: Number(id),
                parkings: {
                    checkOut: IsNull(),
                },
            },
            relations: {
                parkings: {
                    parkingStation: true,
                },
            },
        });
    }

    async getParkingVehicle(
        parkingStationId: number,
        currentTime: Date,
        month: number,
    ) {
        const parkingVehicle = await this.vehicleRepository.find({
            where: [
                {
                    parkings: {
                        parkingStation: {
                            id: parkingStationId,
                        },
                        checkOut: IsNull(),
                    },
                },
                {
                    monthParkings: {
                        month,
                    },
                },
                {
                    bookings: {
                        from: LessThan(currentTime),
                        to: MoreThan(currentTime),
                    },
                },
            ],
            relations: {
                parkings: true,
                monthParkings: true,
                bookings: true,
            },
        });
        return parkingVehicle;
    }

    async getAllUserVehicle(userId: string) {
        return await this.vehicleRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
    }
}
