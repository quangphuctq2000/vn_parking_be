import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

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
    parkingLotId: number;

    userId: string;
}

export class CheckOutDto {
    @ApiProperty()
    @IsNumber()
    parkingLotId: number;

    userId: string;
}
