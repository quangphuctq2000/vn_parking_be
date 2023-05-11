import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Query,
    Render,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateMonthParkingDto } from './month_parkingDto';
import { ValidationPipe } from '@/helpers/validationPipe';
import { ParkingStationsService } from '../parking_stations/parking_stations.service';
import { MonthParkingService } from './month_parking.service';
import { MonthParking } from '@/database/models/monthParking';
import { VehicleService } from '../vehicle/vehicle.service';
import moment from 'moment';
import { OnePayInternational } from 'vn-payments';

@Controller('month-parking')
@ApiTags('Month Parking')
export class MonthParkingController {
    constructor(
        private parkingStationService: ParkingStationsService,
        private monthParkingService: MonthParkingService,
        private vehicleService: VehicleService,
    ) {}
    @Post()
    @HttpCode(200)
    async createMonthParking(
        @Body(new ValidationPipe()) body: CreateMonthParkingDto,
    ) {
        const existingParkingStation = await this.parkingStationService.get(
            body.parkingStationId,
        );
        const existingVehicle = await this.vehicleService.getVehicle(
            body.vehicleIdentityNumber,
        );
        if (!existingVehicle) throw new BadRequestException();
        if (!existingParkingStation) throw new BadRequestException();
        const parkingStationParkingMonth =
            await this.monthParkingService.getParkingStationMonthParking(
                body.parkingStationId,
                body.month,
            );

        if (
            parkingStationParkingMonth[1] ==
            existingParkingStation.parkingLotNumber
        )
            throw new BadRequestException();

        const price = existingParkingStation.pricePerMonth;
        const checkoutInfo = {
            parkingStationId: existingParkingStation.id,
            month: body.month,
            vehicleIdentityNumber: body.vehicleIdentityNumber,
            price,
        };
        const checkoutData = {
            againLink: 'http://localhost:3000',
            amount: price,
            clientIp: '127.0.0.1',
            currency: 'VND',
            locale: 'vn',
            orderId: moment(new Date()).format('HHmmss').toString(),
            returnUrl: 'http://localhost:3000/month-parking/success',
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

    @Get('success')
    @Render('month_parking_payment')
    async monthParkingSuccess(@Query() query) {
        console.log(query);
        const { Title } = query;
        const { parkingStationId, month, price, vehicleIdentityNumber } =
            JSON.parse(Title);
        const parkingStation = await this.parkingStationService.get(
            Number(parkingStationId),
        );
        const vehicle = await this.vehicleService.getVehicle(
            vehicleIdentityNumber,
        );

        const monthParking = new MonthParking();
        monthParking.month = month;
        monthParking.parkingStation = parkingStation;
        monthParking.vehicle = vehicle;

        await this.monthParkingService.createMonthParking(monthParking);

        return {
            month: monthParking.month,
        };
    }
}
