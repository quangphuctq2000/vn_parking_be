import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
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
    CreateParkingStationData,
    GetParkingStationResponse,
    UpdateParkingStationPropertyData,
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
        description: 'create parking station success',
        status: 200,
    })
    @ApiResponse({
        description: 'forbidden',
        status: 403,
    })
    @ApiResponse({
        description: 'unauthorization',
        status: 401,
    })
    @ApiBody({
        type: CreateParkingStationData,
    })
    @ApiBearerAuth()
    @Post()
    @HttpCode(200)
    async createParkingStation(
        @Body(new ValidationPipe()) body: CreateParkingStationData,
        @Req() request: AuthorizedRequest,
    ) {
        try {
            await this.parkingStationsService.createParkingStation(body);
            return true;
        } catch (error) {
            throw error;
        }
    }

    @Get()
    @ApiBearerAuth()
    @ApiResponse({
        type: ParkingStation,
    })
    async getAllParkingStation(@Req() request: AuthorizedRequest) {
        try {
            const parkingStation =
                await this.parkingStationsService.getParkingStationByUserId(
                    request.body.userId,
                );
            console.log('parkingStation', parkingStation);
            return parkingStation;
        } catch (error) {
            return error;
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

    @Put()
    async updateParkingStation(
        @Body(new ValidationPipe()) body: UpdateParkingStationPropertyData,
    ) {
        try {
            await this.parkingStationsService.updateParkingStation(body);
            return true;
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
