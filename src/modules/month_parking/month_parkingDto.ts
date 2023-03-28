import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMonthParkingDto {
    @ApiProperty()
    @IsNumber()
    parkingStationId: number;

    @ApiProperty()
    @IsString()
    vehicleIdentityNumber: string;

    @ApiProperty()
    @IsNumber()
    month: number;
}
