import { ParkingLot } from '@/database/models/parkingLots';
import { ParkingStation } from '@/database/models/parkingStations';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ParkingLotService {
    private parkingLotRepository = this.dataSource.getRepository(ParkingLot);
    constructor(private dataSource: DataSource) {}

    async create(parkingLot: ParkingLot) {
        await this.parkingLotRepository.save(parkingLot);
    }

    async getAll(parkingStationId: number) {
        return await this.parkingLotRepository.find({
            where: {
                parkingStation: {
                    id: parkingStationId,
                },
            },
        });
    }
    async get(id: number) {
        return await this.parkingLotRepository.findOne({
            where: {
                id,
            },
        });
    }
}
