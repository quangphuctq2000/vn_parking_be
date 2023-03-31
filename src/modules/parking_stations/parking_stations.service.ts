import { Parking } from '@/database/models/parking';
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

    async getAllUserParkingStation(userId: string): Promise<ParkingStation[]> {
        return await this.parkingStationRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
    }

    async getUserParkingStation(
        id: number,
        userId: string,
    ): Promise<ParkingStation | null> {
        return await this.parkingStationRepository.findOne({
            where: {
                id,
                user: {
                    id: userId,
                },
            },
        });
    }

    async getAll(): Promise<ParkingStation[]> {
        return await this.parkingStationRepository.find();
    }

    async get(id: number): Promise<ParkingStation> {
        return await this.parkingStationRepository.findOne({
            where: {
                id,
            },
        });
    }
}
