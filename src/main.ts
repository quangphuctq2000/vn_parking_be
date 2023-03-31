import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { User } from './modules/users/user.dto';
import { Vehicle } from './modules/vehicle/vehicle.dto';
import { ParkingStation } from './ultis/dto/parking_station';
import { Parking } from './ultis/dto/parking';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('VN Parking')
        .setDescription('The VN Parking API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [ParkingStation, User, Vehicle, Parking],
    });
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'method',
        },
    });
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
