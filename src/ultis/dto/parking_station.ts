import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNumber, IsString } from 'class-validator';

export class ParkingStation {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    description: string;

    @ApiProperty()
    @IsLongitude()
    longitude: number;

    @ApiProperty()
    @IsLatitude()
    latitude: number;

    @ApiProperty()
    @IsNumber()
    parkingLotNumber: number;

    @ApiProperty()
    @IsNumber()
    pricePerHour: number;

    @ApiProperty()
    @IsNumber()
    pricePerMonth: number;
}
