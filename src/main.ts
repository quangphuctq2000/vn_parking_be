import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ParkingLot } from './modules/parking_lots/parking_lots.dto';
import { ParkingStation } from './modules/parking_stations/parking_station.dto';
import { User } from './modules/users/user.dto';
import { Vehicle } from './modules/vehicle/vehicle.dto';
import { Parking } from './modules/parking/parking.dto';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('VN Parking')
        .setDescription('The VN Parking API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [ParkingLot, ParkingStation, User, Vehicle, Parking],
    });
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
