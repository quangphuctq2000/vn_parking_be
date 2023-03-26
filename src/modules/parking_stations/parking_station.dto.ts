import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ParkingLot } from '../parking_lots/parking_lots.dto';

export class CreateParkingStationDto {
    @ApiProperty({
        default: 'parking station',
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        default: 21.028511,
        required: true,
    })
    @IsNumber()
    latitude: number;

    @ApiProperty({
        default: 105.804817,
        required: true,
    })
    @IsNumber()
    longitude: number;

    @ApiProperty({
        default: '',
        required: false,
    })
    @IsString()
    description: string;

    @ApiProperty({
        default: 0,
        required: true,
    })
    @IsNumber()
    parkingLotNumber: number;

    @ApiProperty()
    @IsNumber()
    pricePerHour: number;

    @ApiProperty()
    @IsNumber()
    pricePerMonth: number;

    @IsString()
    userId: string;
}

export class ParkingStation {
    @ApiProperty({
        default: 123,
        required: true,
    })
    @IsString()
    id: number;

    @ApiProperty({
        default: 'parking station',
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        required: true,
    })
    @IsNumber()
    longitude: number;

    @ApiProperty({
        required: true,
    })
    @IsNumber()
    latitude: number;

    @ApiProperty({
        required: true,
    })
    @IsString()
    description: string;

    // @ApiProperty({
    //     required: true,
    //     type: ParkingLot,
    //     isArray: true,
    // })
    // parkingLots: Array<ParkingLot>;
}
