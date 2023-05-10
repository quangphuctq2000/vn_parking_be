import { Parking } from '@/database/models/parking';
import { ParkingStation } from '@/database/models/parkingStations';
import { User } from '@/database/models/users';
import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { DataSource, IsNull, LessThan, MoreThan, Not } from 'typeorm';
import {
    CreateParkingStationData,
    UpdateParkingStationPropertyData,
} from './parking_station.dto';
import { Role } from '@/ultis/role';
import { MonthParking } from '@/database/models/monthParking';
import { Booking } from '@/database/models/booking';
import moment from 'moment';

@Injectable()
export class ParkingStationsService {
    private parkingStationRepository =
        this.dataSource.getRepository(ParkingStation);
    private parkingRepository = this.dataSource.getRepository(Parking);
    private monthParkingRepository =
        this.dataSource.getRepository(MonthParking);
    private bookingRepository = this.dataSource.getRepository(Booking);
    private entityManager = this.dataSource.manager;
    constructor(private dataSource: DataSource) {}

    async createParkingStation(data: CreateParkingStationData) {
        console.log(data);

        return this.entityManager.transaction(
            async (entityManagerTransaction) => {
                try {
                    const user = await entityManagerTransaction.findOne(User, {
                        where: {
                            id: data.userId,
                        },
                    });

                    if (!user || user.role != Role.parking_station_owner)
                        throw new ForbiddenException();
                    const parkingStation = entityManagerTransaction.create(
                        ParkingStation,
                        data,
                    );
                    parkingStation.user = user;
                    return await entityManagerTransaction.save(
                        ParkingStation,
                        parkingStation,
                    );
                } catch (error) {
                    console.log(error);

                    throw error;
                }
            },
        );
    }

    async create(parkingStation: ParkingStation) {
        await this.parkingStationRepository.save(parkingStation);
    }

    async getAllUserParkingStation(userId: string): Promise<ParkingStation[]> {
        return await this.parkingStationRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
    }

    async getUserParkingStation(
        id: number,
        userId: string,
    ): Promise<ParkingStation | null> {
        return await this.parkingStationRepository.findOne({
            where: {
                id,
                user: {
                    id: userId,
                },
            },
        });
    }

    async getAll(): Promise<ParkingStation[]> {
        return await this.parkingStationRepository.find();
    }

    async get(id: number): Promise<ParkingStation> {
        return await this.parkingStationRepository.findOne({
            where: {
                id,
            },
        });
    }

    async getParkingStationVehicle(parkingStationId: number) {
        const monthParkingOutSide = await this.monthParkingRepository.find({
            where: {
                parkingStation: {
                    id: parkingStationId,
                },
                vehicle: {
                    parkings: [
                        {
                            parkingStation: {
                                id: parkingStationId,
                            },
                            checkOut: Not(IsNull()),
                        },
                        {
                            parkingStation: { id: Not(parkingStationId) },
                        },
                        { id: IsNull() },
                    ],
                },
                month: Number(moment(new Date()).format('M')),
            },
        });
        const bookingOutSide = await this.bookingRepository.find({
            where: {
                parkingStation: {
                    id: parkingStationId,
                },
                vehicle: {
                    parkings: [
                        {
                            parkingStation: {
                                id: parkingStationId,
                            },
                            checkOut: Not(IsNull()),
                        },
                        {
                            parkingStation: { id: Not(parkingStationId) },
                        },
                        { id: IsNull() },
                    ],
                },

                from: LessThan(new Date()),
                to: MoreThan(new Date()),
            },
        });
        console.log('bookingOutSide', bookingOutSide);

        const parkingCar = await this.parkingRepository.find({
            where: {
                parkingStation: {
                    id: parkingStationId,
                },
                checkOut: IsNull(),
            },
        });

        console.log(monthParkingOutSide.length);
        console.log();

        console.log(
            parkingCar.length +
                monthParkingOutSide.length +
                bookingOutSide.length,
        );

        return (
            parkingCar.length +
            monthParkingOutSide.length +
            bookingOutSide.length
        );
    }

    async getParkingStationByUserId(userId: string) {
        return await this.entityManager.transaction(
            async (transactionEntityManager) => {
                try {
                    const user = await transactionEntityManager.findOne(User, {
                        where: {
                            id: userId,
                        },
                    });
                    console.log('user', user);
                    console.log(Role.parking_station_owner);

                    if (!user || user.role != Role.parking_station_owner)
                        throw new ForbiddenException();
                    return await transactionEntityManager.findOne(
                        ParkingStation,
                        {
                            where: {
                                user: {
                                    id: userId,
                                },
                            },
                        },
                    );
                } catch (error) {
                    throw error;
                }
            },
        );
    }

    async updateParkingStation(data: UpdateParkingStationPropertyData) {
        return await this.entityManager.transaction(
            async (transactionEntityManager) => {
                try {
                    const user = await transactionEntityManager.findOne(User, {
                        where: {
                            id: data.userId,
                        },
                    });
                    if (!user || user.role != Role.parking_station_owner)
                        throw new ForbiddenException();

                    await transactionEntityManager.save(ParkingStation, data);
                } catch (error) {
                    throw error;
                }
            },
        );
    }
}
