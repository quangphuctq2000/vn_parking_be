import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get,
    HttpCode,
    Param,
    Post,
    Req,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiParam,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
    CreateParkingStationResponseBody,
    CreateParkingStationRequestBody,
    GetParkingStationResponse,
} from './parking_station.dto';
import { ParkingStationsService } from './parking_stations.service';
import { ValidationPipe } from '@/helpers/validationPipe';
import { ParkingStation } from '@/database/models/parkingStations';
import { UsersService } from '../users/users.service';
import { AuthorizedRequest } from '@/ultis/dto/authorized.request';
import { isParkingStationOwner } from '@/ultis/role';

@ApiTags('Web Parking Station')
@ApiUnauthorizedResponse()
@Controller('web/parking-stations')
export class WebParkingStationsController {
    constructor(
        private parkingStationsService: ParkingStationsService,
        private usersService: UsersService,
    ) {}

    @ApiResponse({
        type: CreateParkingStationResponseBody,
        status: 200,
    })
    @ApiBody({
        type: CreateParkingStationRequestBody,
    })
    @ApiBearerAuth()
    @Post()
    @HttpCode(200)
    async createParkingStation(
        @Body(new ValidationPipe()) body: CreateParkingStationRequestBody,
        @Req() request: AuthorizedRequest,
    ) {
        const { userId } = request.body;
        try {
            const existedUser = await this.usersService.get(userId);
            if (!existedUser) throw new BadRequestException();
            if (isParkingStationOwner(existedUser))
                throw new ForbiddenException();

            const parkingStation = new ParkingStation();
            parkingStation.name = body.name;
            parkingStation.latitude = body.latitude;
            parkingStation.longitude = body.longitude;
            parkingStation.description = body.description;
            parkingStation.parkingLotNumber = body.parkingLotNumber;
            parkingStation.user = existedUser;

            await this.parkingStationsService.create(parkingStation);
            const response: CreateParkingStationResponseBody = {
                id: parkingStation.id,
                name: parkingStation.name,
                latitude: parkingStation.latitude,
                longitude: parkingStation.longitude,
                description: parkingStation.description,
                parkingLotNumber: parkingStation.parkingLotNumber,
                pricePerHour: parkingStation.pricePerHour,
                pricePerMonth: parkingStation.pricePerMonth,
            };
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Get()
    @ApiBearerAuth()
    @ApiResponse({
        type: [ParkingStation],
    })
    async getAllParkingStation(@Req() request: AuthorizedRequest) {
        const { userId } = request.body;
        const existedUser = await this.usersService.get(userId);
        if (!existedUser) throw new BadRequestException();
        if (!isParkingStationOwner) throw new ForbiddenException();
        try {
            return await this.parkingStationsService.getAllUserParkingStation(
                userId,
            );
        } catch (error) {
            throw error;
        }
    }

    @Get('/:id')
    @ApiBearerAuth()
    @ApiResponse({
        type: GetParkingStationResponse,
    })
    @ApiParam({ name: 'id', type: Number })
    async get(
        @Param() params: { id: number },
        @Req() request: AuthorizedRequest,
    ) {
        const { id } = params;
        const { userId } = request.body;
        try {
            const parkingStation =
                await this.parkingStationsService.getUserParkingStation(
                    id,
                    userId,
                );
            const response: GetParkingStationResponse = parkingStation;
            return response;
        } catch (error) {
            throw error;
        }
    }

    // @Delete(':id')
    // @ApiBearerAuth()
    // @ApiResponse({
    //     status: 200,
    // })
    // async remove(@Param('id') id: number) {
    //     console.log('id');
    // }
}
