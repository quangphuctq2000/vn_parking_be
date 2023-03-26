import { Role } from '@/ultis/role';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class SignUpDto {
    @ApiProperty({ enum: Role })
    @IsEnum(Role)
    role: Role;

    @ApiProperty()
    @IsString()
    token: string;
}

export class LoginDto {
    @ApiProperty()
    @IsString()
    token: string;
}
