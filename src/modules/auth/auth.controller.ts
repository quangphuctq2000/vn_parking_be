import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    LoginData,
    CreateUserData,
    AuthWithGoogleData,
    UpdateUserInfoData,
    UpdateUserEmailPasswordData,
    UpdateUser,
} from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @ApiResponse({
        description: 'create user success',
        status: 200,
    })
    @ApiResponse({
        description: 'invalid token',
        status: 401,
    })
    @ApiResponse({
        description: 'user already existed',
        status: 400,
    })
    @HttpCode(200)
    async signUp(@Body(new ValidationPipe()) body: CreateUserData) {
        try {
            await this.authService.createUser(body);
            return true;
        } catch (error) {
            return error;
        }
    }

    @Post('/login')
    @ApiResponse({
        description: 'login success',
        status: 200,
    })
    @ApiResponse({
        description: 'invalid token',
        status: 401,
    })
    @ApiResponse({
        status: 400,
        description: 'bad request',
    })
    @HttpCode(200)
    async login(@Body(new ValidationPipe()) body: LoginData) {
        try {
            await this.authService.login(body);
            return true;
        } catch (error) {
            return error;
        }
    }

    @Post('/google-auth')
    @ApiResponse({
        description: 'login success',
        status: 200,
    })
    @ApiResponse({
        description: 'invalid token',
        status: 401,
    })
    @HttpCode(200)
    async loginWithGoogle(
        @Body(new ValidationPipe()) body: AuthWithGoogleData,
    ) {
        try {
            await this.authService.authWithGoogle(body);
            return true;
        } catch (error) {
            return error;
        }
    }

    @Put('/user-info')
    @ApiBearerAuth()
    async updateUserInfo(@Body(new ValidationPipe()) body: UpdateUserInfoData) {
        try {
            await this.authService.updateUserInfo(body);
            return true;
        } catch (error) {
            return error;
        }
    }

    @Put('/user-auth-info')
    @ApiBearerAuth()
    async updateUserEmailPassword(
        @Body(new ValidationPipe()) body: UpdateUserEmailPasswordData,
    ) {
        try {
            await this.authService.updateEmailPassword(body);
            return true;
        } catch (error) {
            return error;
        }
    }

    @Put('/user')
    @ApiBearerAuth()
    async updateUser(@Body(new ValidationPipe()) body: UpdateUser) {
        try {
            await this.authService.updateUser(body);
            return true;
        } catch (error) {
            return error;
        }
    }
}
