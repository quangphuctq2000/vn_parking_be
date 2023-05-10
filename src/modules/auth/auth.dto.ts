import { Role } from '@/ultis/role';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserData {
    @ApiProperty({ enum: Role })
    @IsEnum(Role)
    role: Role;

    @ApiProperty()
    @IsString()
    token: string;
}

export class LoginData {
    @ApiProperty()
    @IsString()
    token: string;
}

export class AuthWithGoogleData {
    @ApiProperty({ enum: Role })
    @IsEnum(Role)
    role: Role;

    @ApiProperty()
    @IsString()
    token: string;
}

export class UpdateUserInfoData {
    @ApiProperty({ required: false })
    @IsString()
    displayName: string;

    @ApiProperty({
        required: false,
    })
    phoneNumber: string;

    userId: string;
}

export class UpdateUserEmailPasswordData {
    @ApiProperty({ required: false })
    @IsString()
    email: string;

    @ApiProperty({ required: false })
    password?: string;

    userId: string;
}

export class UpdateUser {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    displayName?: string;

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    password?: string;

    userId: string;
}
