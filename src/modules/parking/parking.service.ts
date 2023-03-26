import { Parking } from '@/database/models/Parking';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ParkingService {
    private parkingRepository = this.dataSource.getRepository(Parking);
    constructor(private dataSource: DataSource) {}

    async checkIn(parking: Parking) {
        await this.parkingRepository.save(parking);
    }

    async checkOut() {}
}
