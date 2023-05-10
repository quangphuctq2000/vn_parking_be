import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateBooking } from './booking.dto';
import { ParkingStationsService } from '../parking_stations/parking_stations.service';
import { Booking } from '@/database/models/booking';
import moment from 'moment';
import { Vehicle } from '@/database/models/vehicle';
import { OnePayInternational } from 'vn-payments';

@Injectable()
export class BookingService {
    private bookingRepository = this.dataSource.getRepository(Booking);
    private vehicleRepository = this.dataSource.getRepository(Vehicle);
    constructor(
        private dataSource: DataSource,
        private parkingStationService: ParkingStationsService,
    ) {}

    async createBooking(data: CreateBooking) {
        try {
            const parkingStation = await this.parkingStationService.get(
                data.parkingStationId,
            );
            const parkingStationVehicle =
                await this.parkingStationService.getParkingStationVehicle(
                    data.parkingStationId,
                );
            if (parkingStation.parkingLotNumber <= parkingStationVehicle)
                throw new BadRequestException();
            const booking = this.bookingRepository.create();
            const from = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            const to = moment(from)
                .add(data.hourBooking, 'h')
                .format('YYYY-MM-DD HH:mm:ss');
            const price = parkingStation.pricePerHour * data.hourBooking;
            booking.from = new Date(from);
            booking.to = new Date(to);
            booking.price = -1;
            booking.vehicle = await this.vehicleRepository.findOne({
                where: {
                    identityNumber: data.identityNumber,
                },
            });
            booking.parkingStation = parkingStation;
            const result = await this.bookingRepository.save(booking);
            const checkoutData = {
                againLink: 'http://localhost:3000',
                amount: price,
                clientIp: '127.0.0.1',
                currency: 'VND',
                locale: 'vn',
                orderId: moment(new Date()).format('HHmmss').toString(),
                returnUrl: 'http://localhost:3000/booking/success',
                title: JSON.stringify({ id: result.id, price }),
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
            return checkoutUrl;
        } catch (error) {
            throw error;
        }
    }

    async bookingSuccess(id: number, price: number) {
        const booking = await this.bookingRepository.findOne({
            where: {
                id,
            },
        });
        booking.price = price;
        await this.bookingRepository.save(booking);
    }
}
