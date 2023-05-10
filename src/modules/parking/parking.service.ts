import { Parking } from '@/database/models/parking';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, IsNull, LessThan, MoreThan, Not } from 'typeorm';
import {
    CheckInDto,
    CheckoutManualData,
    CheckoutManualSuccessData,
} from './parking.dto';
import { ParkingStation } from '@/database/models/parkingStations';
import { Vehicle } from '@/database/models/vehicle';
import { MonthParking } from '@/database/models/monthParking';
import moment from 'moment';

@Injectable()
export class ParkingService {
    private parkingRepository = this.dataSource.getRepository(Parking);
    private entityManager = this.dataSource.manager;
    constructor(private dataSource: DataSource) {}

    checkIn(data: CheckInDto) {
        return this.entityManager.transaction(
            async (transactionEntityManager) => {
                try {
                    const parkingStation =
                        await transactionEntityManager.findOne(ParkingStation, {
                            where: {
                                user: {
                                    id: data.userId,
                                },
                            },
                        });
                    const vehicle = await transactionEntityManager.findOne(
                        Vehicle,
                        {
                            where: {
                                identityNumber: data.vehicleIdentity,
                            },
                        },
                    );
                    if (!parkingStation) throw new BadRequestException();
                    const parking = transactionEntityManager.create(Parking, {
                        parkingStation: {
                            id: parkingStation.id,
                        },
                        vehicleIdentityNumber: data.vehicleIdentity,
                        checkIn: new Date(),
                        vehicle: vehicle,
                    });
                    await transactionEntityManager.save(Parking, parking);
                } catch (error) {
                    throw error;
                }
            },
        );
    }

    async checkOut(vehicleIdentity: string, parkingStationId: number) {
        console.log(
            'vehicleIdentity, parkingStationId',
            vehicleIdentity,
            parkingStationId,
        );

        return await this.parkingRepository.findOne({
            where: [
                {
                    parkingStation: {
                        id: parkingStationId,
                    },
                    vehicle: {
                        identityNumber: vehicleIdentity,
                    },
                    checkOut: IsNull(),
                },
                {
                    parkingStation: {
                        id: parkingStationId,
                    },
                    vehicleIdentityNumber: vehicleIdentity,
                    checkOut: IsNull(),
                },
            ],
            relations: {
                parkingStation: true,
            },
        });
    }

    async getParkingCarNumber(parkingStationId: number) {
        const parkingCarNumber = await this.parkingRepository.findAndCount({
            where: {
                parkingStation: {
                    id: parkingStationId,
                },
                checkOut: null,
            },
        });
    }

    async checkOutSuccess(parking: Parking) {
        await this.parkingRepository.save(parking);
    }

    async getParking(id: number) {
        return await this.parkingRepository.findOne({
            where: {
                id,
            },
        });
    }

    async getParkingVehicle(
        parkingStationId: number,
        currentTime: Date,
        month: number,
    ) {
        const parkingVehicle = await this.parkingRepository.find({
            where: {
                parkingStation: {
                    id: parkingStationId,
                },
                vehicle: [
                    {
                        parkings: {
                            checkOut: IsNull(),
                        },
                    },
                    {
                        monthParkings: {
                            month,
                        },
                    },
                    // {
                    //     bookings: {
                    //         from: LessThan(currentTime),
                    //         to: MoreThan(currentTime),
                    //     },
                    // },
                    {
                        identityNumber: Not(IsNull()),
                    },
                ],
            },
        });
        await this.parkingRepository.find({
            where: [
                {
                    parkingStation: {
                        id: parkingStationId,
                    },
                    vehicle: [
                        {
                            parkings: {
                                checkOut: IsNull(),
                            },
                        },
                        {
                            monthParkings: {
                                month,
                            },
                        },
                        // {
                        //     bookings: {
                        //         from: LessThan(currentTime),
                        //         to: MoreThan(currentTime),
                        //     },
                        // },
                    ],
                },
                {
                    parkingStation: {
                        id: parkingStationId,
                    },
                    vehicle: IsNull(),
                    checkOut: IsNull(),
                },
            ],
        });
        return parkingVehicle;
    }
    checkoutManual(data: CheckoutManualData) {
        return this.entityManager.transaction(
            async (transactionEntityManager) => {
                try {
                    const parkingStation =
                        await transactionEntityManager.findOne(ParkingStation, {
                            where: {
                                user: {
                                    id: data.userId,
                                },
                            },
                        });

                    const parking = await this.checkOut(
                        data.vehicleIdentity,
                        parkingStation.id,
                    );

                    const checkoutTime = moment(new Date());
                    const monthParking = await this.entityManager.findOne(
                        MonthParking,
                        {
                            where: {
                                month: checkoutTime.format(
                                    'M',
                                ) as unknown as number,
                                parkingStation: {
                                    id: parkingStation.id,
                                },
                                vehicle: {
                                    identityNumber: data.vehicleIdentity,
                                },
                            },
                        },
                    );

                    if (monthParking) {
                        parking.checkOut = new Date();
                        parking.price = 0;
                        await this.checkOutSuccess(parking);
                        return parking;
                    }
                    const duration = moment
                        .duration(checkoutTime.diff(moment(parking.checkIn)))
                        .hours();
                    const price =
                        duration > 1
                            ? parking.parkingStation.pricePerHour * duration
                            : parking.parkingStation.pricePerHour;
                    parking.price = price;
                    parking.checkOut = new Date();
                    return parking;
                } catch (error) {
                    throw error;
                }
            },
        );
    }

    async checkoutManualSuccess(data: CheckoutManualSuccessData) {
        try {
            console.log(data);

            const parking = await this.parkingRepository.findOne({
                where: {
                    id: data.parkingId,
                },
            });
            console.log('asdfasdfasdf');
            console.log(parking);

            if (!parking) throw new BadRequestException();
            parking.checkOut = new Date(data.checkOut);
            parking.price = data.price;
            await this.parkingRepository.save(parking);
            console.log('checkout success');
        } catch (error) {
            throw error;
        }
    }
}
