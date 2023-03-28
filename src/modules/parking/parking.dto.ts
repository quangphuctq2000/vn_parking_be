import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class Parking {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNumber()
    vehicleId: number;

    @ApiProperty()
    @IsNumber()
    parkingLotId: number;
}

export class CheckInDto {
    @ApiProperty()
    @IsNumber()
    parkingStationId: number;

    @ApiProperty()
    @IsString()
    vehicleIdentity: string;
}

export class CheckOutDto {
    @ApiProperty()
    @IsNumber()
    parkingStationId: number;

    @ApiProperty()
    @IsString()
    vehicleIdentity: string;
}

export class CheckoutSuccessDto {
    @ApiProperty()
    @IsNumber()
    parkingId: number;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsDate()
    checkOut: Date;
}
