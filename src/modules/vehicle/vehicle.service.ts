import { Vehicle } from '@/database/models/vehicle';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class VehicleService {
    private vehicleRepository = this.dataSource.getRepository(Vehicle);
    constructor(private dataSource: DataSource) {}

    async create(vehicle: Vehicle) {
        await this.vehicleRepository.save(vehicle);
    }
}
