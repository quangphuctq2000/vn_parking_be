import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Query,
    Redirect,
    Req,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiProperty,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { ParkingService } from './parking.service';
import { ParkingLotService } from '../parking_lots/parking_lots.service';
import { UsersService } from '../users/users.service';
import { Parking } from '@/database/models/parking';
import { CheckInDto, CheckOutDto, CheckoutSuccessDto } from './parking.dto';
import { ValidationPipe } from '@/helpers/validationPipe';
import { ParkingStationsService } from '../parking_stations/parking_stations.service';
import { VehicleService } from '../vehicle/vehicle.service';
import moment from 'moment';
import { request } from 'http';
import { OnePayInternational } from 'vn-payments';
import { MonthParkingService } from '../month_parking/month_parking.service';

@Controller('parking')
@ApiTags('parking')
export class ParkingController {
    constructor(
        private parkingService: ParkingService,
        private parkingLotService: ParkingLotService,
        private usersService: UsersService,
        private parkingStationService: ParkingStationsService,
        private vehicleService: VehicleService,
        private monthParkingService: MonthParkingService,
    ) {}

    @Post('/checkIn')
    // @ApiBearerAuth()
    @ApiProperty({
        type: CheckInDto,
    })
    async checkIn(@Body(new ValidationPipe()) body: CheckInDto) {
        try {
            const parkingStation =
                await this.parkingStationService.getParkingStation(
                    body.parkingStationId,
                );
            if (!parkingStation) throw new BadRequestException();
            const existingVehicle = await this.vehicleService.get(
                body.vehicleIdentity,
            );
            const parking = new Parking();
            parking.parkingStation = parkingStation;
            parking.checkIn = new Date();
            parking.vehicleIdentityNumber = body.vehicleIdentity;
            if (existingVehicle) {
                parking.vehicle = existingVehicle;
            }
            await this.parkingService.checkIn(parking);
            return parking;
        } catch (error) {
            throw error;
        }
    }

    @Post('/checkOut')
    // @ApiBearerAuth()
    @ApiBody({
        type: CheckOutDto,
    })
    // @Redirect()
    async checkOut(@Req() request: { body: CheckOutDto; ip }) {
        const { body } = request;
        const parking = await this.parkingService.checkOut(
            body.vehicleIdentity,
            body.parkingStationId,
        );
        console.log(parking);

        const checkout = moment(new Date());
        const existingMonthParking =
            await this.monthParkingService.getMonthParking(
                checkout.format('M') as unknown as number,
                body.parkingStationId,
                body.vehicleIdentity,
            );
        console.log(existingMonthParking);

        if (existingMonthParking) {
            parking.checkOut = new Date();
            parking.price = 0;
            await this.parkingService.checkOutSuccess(parking);
            return 'success';
        }
        const duration = moment
            .duration(checkout.diff(moment(parking.checkIn)))
            .hours();
        console.log(duration);

        const price =
            duration > 1
                ? parking.parkingStation.pricePerHour * duration
                : parking.parkingStation.pricePerHour;
        console.log(parking);
        console.log(duration);
        const checkoutInfo = {
            parkingId: parking.id,
            checkOut: new Date(),
            price,
        };
        const checkoutData = {
            againLink: 'http://localhost:3000',
            amount: price,
            clientIp: request.ip,
            currency: 'VND',
            locale: 'vn',
            orderId: moment(new Date()).format('HHmmss').toString(),
            returnUrl: 'http://localhost:3000/parking/checkoutSuccess',
            title: JSON.stringify(checkoutInfo),
            transactionId: moment(new Date()).format('HHmmss').toString(),
            vpcAccessCode: '6BEB2546',
            vpcCommand: 'pay',
            vpcMerchant: 'TESTONEPAY',
            vpcVersion: '2',
        };
        const onepayIntl = new OnePayInternational({
            paymentGateway: 'https://mtf.onepay.vn/vpcpay/vpcpay.op',
            merchant: 'TESTONEPAY',
            accessCode: '6BEB2546',
            secureSecret: '6D0870CDE5F24F34F3915FB0045120DB',
        });
        const checkoutUrl = await onepayIntl.buildCheckoutUrl(checkoutData);
        console.log(checkoutUrl.href);

        return checkoutUrl.href;
    }

    @Get('/checkoutSuccess')
    @ApiProperty({ type: CheckoutSuccessDto })
    async checkOutSuccess(@Req() request) {
        console.log(request.query);
        console.log(request.query.Title);

        const parking: {
            parkingId: number;
            checkOut: Date;
            price;
        } = JSON.parse(request.query.Title);

        const existingParking = await this.parkingService.getParking(
            parking.parkingId,
        );
        if (!existingParking) throw new BadRequestException();
        existingParking.checkOut = new Date(parking.checkOut);
        existingParking.price = parking.price;
        await this.parkingService.checkOutSuccess(existingParking);
        return existingParking;
    }
}
