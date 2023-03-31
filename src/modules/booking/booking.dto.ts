import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBooking {
    @ApiProperty()
    @IsString()
    identityNumber: string;

    @ApiProperty()
    @IsNumber()
    parkingStationId: number;

    @ApiProperty()
    @IsNumber()
    hourBooking: number;
}
