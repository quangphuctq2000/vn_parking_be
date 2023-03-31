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

export const dataSource = {
    provide: DataSource,
    useFactory: async (): Promise<DataSource> => {
        const databaseConfig = dbConfig;
        console.log(databaseConfig);

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
            ],
            synchronize: true,
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
