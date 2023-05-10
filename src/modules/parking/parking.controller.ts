import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Req,
    HttpCode,
    Param,
    Render,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiParam,
    ApiProperty,
    ApiTags,
} from '@nestjs/swagger';
import { ParkingService } from './parking.service';
import {
    CheckInDto,
    CheckOutDto,
    CheckoutManualData,
    CheckoutManualSuccessData,
    CheckoutSuccessDto,
} from './parking.dto';
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
        private parkingStationService: ParkingStationsService,
        private vehicleService: VehicleService,
        private monthParkingService: MonthParkingService,
    ) {}

    @Post('/checkIn')
    @ApiBearerAuth()
    @HttpCode(200)
    @ApiProperty({
        type: CheckInDto,
    })
    async checkIn(@Body(new ValidationPipe()) body: CheckInDto) {
        try {
            const parkingStation =
                await this.parkingStationService.getParkingStationByUserId(
                    body.userId,
                );
            const carInParkingStation =
                await this.parkingStationService.getParkingStationVehicle(
                    parkingStation.id,
                );
            if (parkingStation.parkingLotNumber <= carInParkingStation)
                throw new BadRequestException();
            await this.parkingService.checkIn(body);
            return true;
        } catch (error) {
            throw error;
        }
    }

    @Post('/checkOut')
    @ApiBearerAuth()
    @ApiBody({
        type: CheckOutDto,
    })
    // @Redirect()
    @HttpCode(200)
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
            clientIp: '127.0.0.1',
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

    @Post('/checkout-manual-info')
    @HttpCode(200)
    async checkoutManual(@Body(new ValidationPipe()) body: CheckoutManualData) {
        try {
            const result = await this.parkingService.checkoutManual(body);
            console.log(result);

            return result;
        } catch (error) {
            return error;
        }
    }
    @Post('/checkout-manual-success')
    @HttpCode(200)
    async checkoutManualSuccess(
        @Body(new ValidationPipe()) body: CheckoutManualSuccessData,
    ) {
        try {
            await this.parkingService.checkoutManualSuccess(body);
            return true;
        } catch (error) {
            return error;
        }
    }

    @Get('/checkoutSuccess')
    @Render('parking_payment')
    @ApiProperty({ type: CheckoutSuccessDto })
    async checkOutSuccess(@Req() request) {
        console.log(request.query);
        console.log('request.query.Title', request.query.Title);

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
        return {
            parkingId: parking.parkingId,
        };
    }

    @Get('/detail/:id')
    @ApiParam({ name: 'id', type: Number })
    async getParking(@Param() params: any) {
        try {
            const result = await this.parkingService.getParking(params.id);
            console.log(result);
            return result;
        } catch (error) {
            return error;
        }
    }
}
