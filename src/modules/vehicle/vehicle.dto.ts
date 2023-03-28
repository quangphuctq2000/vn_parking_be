import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Vehicle {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    identityNumber: string;

    @ApiProperty()
    @IsString()
    description: string;
}

export class CreateVehicleDto {
    @ApiProperty()
    @IsString()
    identityNumber: string;

    @ApiProperty()
    @IsString()
    description: string;

    userId: string;
}
