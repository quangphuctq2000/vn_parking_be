import {
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Req,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiQuery,
    ApiResponse,
    ApiResponseProperty,
    ApiTags,
} from '@nestjs/swagger';
import { CreateParkingLotDto } from './parking_lots.dto';
import { ParkingLotService } from './parking_lots.service';
import { ParkingStationsService } from '../parking_stations/parking_stations.service';
import { ParkingLot } from '@/database/models/parkingLots';
import { ParkingLot as ParkingLotResponse } from './parking_lots.dto';

@ApiTags('Parking Lots')
@Controller('parking-lots')
export class ParkingLotController {
    constructor(
        private parkingStationService: ParkingStationsService,
        private parkingLotService: ParkingLotService,
    ) {}

    @Post()
    @ApiBearerAuth()
    @ApiQuery({ name: 'parkingStationId', type: Number })
    @ApiBody({
        type: CreateParkingLotDto,
    })
    @ApiResponse({
        type: ParkingLotResponse,
        status: 200,
    })
    @HttpCode(200)
    async create(
        @Req()
        request: {
            body: CreateParkingLotDto;
            query: { parkingStationId: number };
        },
    ) {
        const {
            body,
            query: { parkingStationId },
        } = request;
        try {
            const existedParkingStation = await this.parkingStationService.get(
                parkingStationId,
                request.body.userId,
            );
            if (!existedParkingStation) throw new Error();
            const parkingLot = new ParkingLot();
            parkingLot.number = body.number;
            parkingLot.pricePerHour = body.pricePerHour;
            parkingLot.pricePerMonth = body.pricePerMonth;
            parkingLot.type = body.type;
            parkingLot.freeLot = body.number;
            parkingLot.parkingStation = existedParkingStation;
            await this.parkingLotService.create(parkingLot);
            const response: ParkingLotResponse = {
                id: parkingLot.id,
                type: parkingLot.type,
                number: parkingLot.number,
                pricePerHour: parkingLot.pricePerHour,
                pricePerMonth: parkingLot.pricePerMonth,
            };
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Put()
    async update() {}

    @Get(':id')
    async get() {}

    @Delete()
    async remove() {}

    @Get()
    @ApiQuery({ name: 'parkingStationId', type: Number })
    @ApiBearerAuth()
    @ApiResponse({
        type: ParkingLotResponse,
        isArray: true,
    })
    async getAll(
        @Req()
        request: {
            body: { userId: string };
            query: { parkingStationId: number };
        },
    ) {
        try {
            const {
                body: { userId },
                query: { parkingStationId },
            } = request;
            const existedParkingStation = await this.parkingStationService.get(
                parkingStationId,
                userId,
            );
            if (!existedParkingStation) throw new Error();
            const parkingLots = await this.parkingLotService.getAll(
                existedParkingStation.id,
            );
            return parkingLots;
        } catch (error) {
            throw error;
        }
    }
}
