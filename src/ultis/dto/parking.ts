import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class Parking {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNumber()
    parkingStationId: number;

    @ApiProperty()
    @IsNumber()
    vehicleId: number;

    @ApiProperty()
    @IsDate()
    checkIn: Date;

    @ApiProperty()
    @IsDate()
    checkOut: Date;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsString()
    vehicleIdentityNumber: string;
}
