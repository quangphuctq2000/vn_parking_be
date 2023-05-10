import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBooking } from './booking.dto';
import moment from 'moment';

@Controller('booking')
@ApiTags('Booking')
export class BookingController {
    constructor(private bookingService: BookingService) {}
    @Post()
    @ApiBody({
        type: CreateBooking,
    })
    async createBooking(@Body() body: CreateBooking) {
        return await this.bookingService.createBooking(body);
    }

    @Get('/success')
    @ApiBody({
        type: CreateBooking,
    })
    async bookingSuccess(@Req() request) {
        console.log(request.query);
        console.log('request.query.Title', request.query.Title);
        const { id, price } = JSON.parse(request.query.Title);
        await this.bookingService.bookingSuccess(Number(id), Number(price));
        return true;
    }
}
