import { DataSource } from 'typeorm';
import { User } from './models/users';
import { RevokeToken } from './models/revokeTokens';
import { ParkingStation } from './models/parkingStations';
import { ParkingLot } from './models/parkingLots';
import { dbConfig } from '@/ultis/config';
import { Vehicle } from './models/vehicle';

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
            entities: [User, RevokeToken, ParkingStation, ParkingLot, Vehicle],
            synchronize: true,
        });
        try {
            await dataSource.initialize();
        } catch (error) {
            console.log(error);
        }
        return dataSource;
    },
};
