import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class User {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    email: string;
}
