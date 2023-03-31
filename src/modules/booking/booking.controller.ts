import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBooking } from './booking.dto';
import { VehicleService } from '../vehicle/vehicle.service';
import moment from 'moment';

@Controller('booking')
@ApiTags('Booking')
export class BookingController {
    constructor(
        private bookingService: BookingService,
        private vehicleService: VehicleService,
    ) {}
    @Post()
    @ApiBody({
        type: CreateBooking,
    })
    async createBooking(@Body() body: CreateBooking) {
        const currentTime = new Date();
        const month = moment(currentTime).format('M');
        console.log(body.parkingStationId);

        console.log(month);
        try {
            const result = await this.vehicleService.getParkingVehicle(
                Number(body.parkingStationId),
                new Date(),
                Number(month),
            );
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
}
