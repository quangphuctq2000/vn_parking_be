import {
    BadRequestException,
    Body,
    Controller,
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
} from '@nestjs/swagger';
import { CreateVehicleDto } from './vehicle.dto';
import { ValidationPipe } from '@/helpers/validationPipe';
import { UsersService } from '../users/users.service';
import { VehicleService } from './vehicle.service';
import { Vehicle } from '@/database/models/vehicle';
import { Vehicle as VehicleResponse } from './vehicle.dto';
import { number, string } from 'yargs';

@Controller('vehicle')
@ApiTags('Vehicle')
export class VehicleController {
    constructor(
        private vehicleService: VehicleService,
        private usersService: UsersService,
    ) {}
    @Post()
    @ApiBody({
        type: CreateVehicleDto,
    })
    @ApiBearerAuth()
    @ApiResponse({
        type: VehicleResponse,
        status: 200,
    })
    @HttpCode(200)
    async create(@Body(new ValidationPipe()) body: CreateVehicleDto) {
        try {
            const existedUser = await this.usersService.get(body.userId);
            if (!existedUser) throw new BadRequestException();
            const vehicle = new Vehicle();
            vehicle.identityNumber = body.identityNumber;
            vehicle.description = body.description;
            vehicle.user = existedUser;
            const existedVehicle = await this.vehicleService.get(
                vehicle.identityNumber,
            );
            if (existedVehicle) throw new BadRequestException();
            await this.vehicleService.create(vehicle);
            const response: VehicleResponse = {
                id: vehicle.id,
                description: vehicle.description,
                identityNumber: vehicle.identityNumber,
            };
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Get()
    @ApiBearerAuth()
    async get(@Req() request) {
        return await this.vehicleService.getAllUserVehicle(request.body.userId);
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: Number,
    })
    @ApiBearerAuth()
    async getVehicle(@Param() params) {
        console.log(params.id);

        return await this.vehicleService.getVehicleById(params.id);
    }
}
