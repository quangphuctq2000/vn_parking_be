import { ParkingStation } from '@/ultis/dto/parking_station';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateParkingStationRequestBody {
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
}

export class CreateParkingStationResponseBody extends ParkingStation {}

export class GetParkingStationResponse extends ParkingStation {}

export const GetAllParkingStationResponse =  Array<ParkingStation>
