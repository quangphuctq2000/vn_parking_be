import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVehicleDto } from './vehicle.dto';
import { ValidationPipe } from '@/helpers/validationPipe';
import { UsersService } from '../users/users.service';
import { VehicleService } from './vehicle.service';
import { Vehicle } from '@/database/models/vehicle';
import { Vehicle as VehicleResponse } from './vehicle.dto';

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
}
