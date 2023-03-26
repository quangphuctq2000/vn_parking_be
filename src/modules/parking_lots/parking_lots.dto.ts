import { ParkingLotType } from '@/ultis/parkingLot';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateParkingLotDto {
    @ApiProperty({
        default: ParkingLotType.carParkingLot,
        required: true,
    })
    @IsString()
    type: ParkingLotType;

    @ApiProperty({
        default: 0,
        required: true,
    })
    @IsNumber()
    number: number;

    @ApiProperty({
        default: 0,
        required: true,
    })
    @IsNumber()
    pricePerHour: number;

    @ApiProperty({
        default: 0,
        required: true,
    })
    @IsNumber()
    pricePerMonth: number;

    @IsString()
    userId: string;
}

export class ParkingLot {
    @ApiProperty()
    id: number;

    @ApiProperty()
    type: ParkingLotType;

    @ApiProperty()
    pricePerHour: number;

    @ApiProperty()
    pricePerMonth: number;

    @ApiProperty()
    number: number;
}
