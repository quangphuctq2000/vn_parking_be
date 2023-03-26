import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Vehicle {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    identityNumber: string;
}

export class CreateVehicleDto {
    @ApiProperty()
    @IsString()
    identityNumber: string;

    userId: string;
}
