import { ConfigService } from './../config/config.service';
import { DataSource } from 'typeorm';
import { Users } from './models/users';
import { RevokeTokens } from './models/revokeTokens';
import { ParkingStations } from './models/parkingStations';

export const dataSource = {
  provide: DataSource,
  useFactory: async (configService: ConfigService): Promise<DataSource> => {
    const dbConfig = configService.getDatabaseConfig();
    const dataSource = new DataSource({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [Users, RevokeTokens, ParkingStations],
      synchronize: true,
    });
    try {
      await dataSource.initialize();
    } catch (error) {
      console.log(error);
    }
    return dataSource;
  },
  inject: [ConfigService],
};
