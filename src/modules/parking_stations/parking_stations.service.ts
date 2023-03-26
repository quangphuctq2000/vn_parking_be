import { ParkingStation } from '@/database/models/parkingStations';
import { User } from '@/database/models/users';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ParkingStationsService {
    private parkingStationRepository =
        this.dataSource.getRepository(ParkingStation);
    constructor(private dataSource: DataSource) {}

    async create(parkingStation: ParkingStation) {
        await this.parkingStationRepository.save(parkingStation);
    }

    async getAll(userId: string) {
        return await this.parkingStationRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
    }

    async get(id: number, userId: string) {
        return await this.parkingStationRepository.findOne({
            where: {
                id,
                user: {
                    id: userId,
                },
            },
            // relations: {
            //     parkingLots: true,
            // },
        });
    }
}
