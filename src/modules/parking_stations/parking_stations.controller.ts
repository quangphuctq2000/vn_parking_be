import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Req,
    Request,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateParkingStationDto } from './parking_station.dto';
import { ParkingStationsService } from './parking_stations.service';
import { ValidationPipe } from '@/helpers/validationPipe';
import { ParkingStation } from '@/database/models/parkingStations';
import { UsersService } from '../users/users.service';
import { ParkingStation as ParkingStationResponse } from './parking_station.dto';

@ApiTags('Parking Station')
@Controller('parking-stations')
export class ParkingStationsController {
    constructor(
        private parkingStationsService: ParkingStationsService,
        private usersService: UsersService,
    ) {}

    @ApiResponse({
        description: 'create parking station success',
        type: ParkingStationResponse,
        status: 200,
    })
    @ApiBearerAuth()
    @Post()
    @HttpCode(200)
    async create(@Body(new ValidationPipe()) body: CreateParkingStationDto) {
        try {
            const existedUser = await this.usersService.get(body.userId);
            if (!existedUser) {
                throw new Error();
            }
            const parkingStation = new ParkingStation();

            parkingStation.name = body.name;
            parkingStation.latitude = body.latitude;
            parkingStation.longitude = body.longitude;
            parkingStation.description = body.description;
            parkingStation.parkingLotNumber = body.parkingLotNumber;
            parkingStation.user = existedUser;

            await this.parkingStationsService.create(parkingStation);
            const response: ParkingStation = {
                id: parkingStation.id,
                name: parkingStation.name,
                latitude: parkingStation.latitude,
                longitude: parkingStation.longitude,
                description: parkingStation.description,
                parkingLotNumber: parkingStation.parkingLotNumber,
                pricePerHour: parkingStation.pricePerHour,
                pricePerMonth: parkingStation.pricePerMonth,
                user: existedUser,
            };
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Get()
    @ApiBearerAuth()
    @ApiResponse({
        type: ParkingStationResponse,
        isArray: true,
    })
    async findAll(@Request() request: { body: { userId: string } }) {
        try {
            console.log(request.body);

            return this.parkingStationsService.getAll(request.body.userId);
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiResponse({
        type: ParkingStationResponse,
    })
    @ApiParam({ name: 'id', type: Number })
    async get(
        @Request()
        request: {
            params: { id: number };
            body: { userId: string };
        },
    ) {
        try {
            const {
                params: { id },
                body: { userId },
            } = request;
            const parkingStation = await this.parkingStationsService.get(
                id,
                userId,
            );
            const response: ParkingStationResponse = parkingStation;
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
    })
    async remove(@Param('id') id: number) {
        console.log(id);
    }
}
