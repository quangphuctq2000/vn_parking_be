import { Controller, Get, Param, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParkingStationsService } from './parking_stations.service';
import { GetParkingStationResponse as ParkingStationResponse } from './parking_station.dto';
import { ParkingStation } from '@/ultis/dto/parking_station';

@ApiTags('Parking Station')
@Controller('parking-stations')
export class ParkingStationsController {
    constructor(private parkingStationsService: ParkingStationsService) {}

    @Get()
    @ApiBearerAuth()
    @ApiResponse({
        type: ParkingStation,
        isArray: true,
    })
    async findAll() {
        try {
            return this.parkingStationsService.getAll();
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    @ApiBearerAuth()
    @ApiResponse({
        type: ParkingStationResponse,
    })
    @ApiParam({ name: 'id', type: Number })
    async get(@Param() params: { id: number }) {
        try {
            const { id } = params;
            const parkingStation = await this.parkingStationsService.get(id);
            const response: ParkingStationResponse = parkingStation;
            return response;
        } catch (error) {
            throw error;
        }
    }
}
