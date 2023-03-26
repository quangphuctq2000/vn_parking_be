import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateVehicleDto } from './vehicle.dto';
import { ValidationPipe } from '@/helpers/validationPipe';
import { UsersService } from '../users/users.service';
import { VehicleService } from './vehicle.service';
import { Vehicle } from '@/database/models/vehicle';
import { Vehicle as VehicleResponse } from './vehicle.dto';

@Controller('vehicle')
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
            vehicle.user = existedUser;
            await this.vehicleService.create(vehicle);
            const response: VehicleResponse = {
                id: vehicle.id,
                identityNumber: vehicle.identityNumber,
            };
            return response;
        } catch (error) {
            throw error;
        }
    }
}
