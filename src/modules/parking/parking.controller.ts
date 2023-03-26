import {
    BadRequestException,
    Body,
    Controller,
    Post,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParkingService } from './parking.service';
import { ParkingLotService } from '../parking_lots/parking_lots.service';
import { UsersService } from '../users/users.service';
import { Parking } from '@/database/models/Parking';
import { CheckInDto } from './parking.dto';
import { ValidationPipe } from '@/helpers/validationPipe';

@Controller('parking')
@ApiTags('parking')
export class ParkingController {
    constructor(
        private parkingService: ParkingService,
        private parkingLotService: ParkingLotService,
        private usersService: UsersService,
    ) {}

    @Post('/checkIn')
    @ApiBearerAuth()
    @ApiProperty({
        type: CheckInDto,
    })
    async checkIn(@Body(new ValidationPipe()) body: CheckInDto) {
        try {
            const existedUser = await this.usersService.get(body.userId);
            if (!existedUser) throw new BadRequestException();
            const existedParkingLot = await this.parkingLotService.get(
                body.parkingLotId,
            );
            if (!existedParkingLot) throw new BadRequestException();
            const parking = new Parking();
            parking.parkingLot = existedParkingLot;
            parking.checkIn = new Date();
            parking.vehicle = existedUser.vehicle;
            await this.parkingService.checkIn(parking);

            console.log(parking);
        } catch (error) {
            throw error;
        }
    }

    @Post('/checkOut')
    @ApiBearerAuth()
    async checkOut() {}
}
