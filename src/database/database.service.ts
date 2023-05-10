import { DataSource } from 'typeorm';
import { User } from './models/users';
import { RevokeToken } from './models/revokeTokens';
import { ParkingStation } from './models/parkingStations';
import { ParkingLot } from './models/parkingLots';
import { dbConfig } from '@/ultis/config';
import { Vehicle } from './models/vehicle';
import { Parking } from './models/parking';
import { Booking } from './models/booking';
import { MonthParking } from './models/monthParking';
import { Notification } from './models/notification';
import { ParkingStationDocument } from './models/parkingStationDocument';
import { Feedback } from '@database/models/feedback';

export const dataSource = {
    provide: DataSource,
    useFactory: async (): Promise<DataSource> => {
        const databaseConfig = dbConfig;
        const dataSource = new DataSource({
            type: databaseConfig.type,
            host: databaseConfig.host,
            port: databaseConfig.port,
            username: databaseConfig.username,
            password: databaseConfig.password,
            database: databaseConfig.database,
            entities: [
                User,
                RevokeToken,
                ParkingStation,
                ParkingLot,
                Vehicle,
                Parking,
                Booking,
                MonthParking,
                Notification,
                ParkingStationDocument,
                Feedback,
            ],
            // synchronize: true,
            logging: true,
        });
        try {
            await dataSource.initialize();
        } catch (error) {
            console.log(error);
        }
        return dataSource;
    },
};
