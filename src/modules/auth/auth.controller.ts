import {
    Body,
    ConflictException,
    Controller,
    HttpCode,
    NotFoundException,
    Post,
    Query,
    Req,
    UnauthorizedException,
    ValidationPipe,
} from '@nestjs/common';
// import certificate from './../../../project-9f526-firebase-adminsdk-kzbop-7b87b3db21.json';
import { AuthService } from './auth.service';
import {
    ApiBody,
    ApiProperty,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { User } from '@/database/models/users';
import { User as UserResponse } from './../users/user.dto';
import { Role } from '@/ultis/role';
import { LoginDto, SignUpDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {}

    @Post('/signup')
    @ApiResponse({
        type: UserResponse,
        status: 200,
    })
    @HttpCode(200)
    async signUp(@Body(new ValidationPipe()) body: SignUpDto) {
        const decodedIdToken = await this.authService.checkToken(body.token);
        console.log(body);

        if (!decodedIdToken) throw new UnauthorizedException();
        try {
            const existedUser = await this.usersService.get(decodedIdToken.uid);
            if (existedUser) throw new ConflictException();

            const newUser = new User();
            newUser.id = decodedIdToken.uid;
            newUser.email = decodedIdToken.email;
            newUser.role = body.role;
            await this.usersService.create(newUser);
            const response: UserResponse = {
                id: newUser.id,
                email: newUser.email,
            };
            return response;
        } catch (error) {
            throw error;
        }
    }

    @Post('/login')
    @ApiResponse({
        type: UserResponse,
        status: 200,
    })
    @HttpCode(200)
    async login(@Body(new ValidationPipe()) body: LoginDto) {
        const decodedIdToken = await this.authService.checkToken(body.token);
        if (!decodedIdToken) throw new UnauthorizedException();
        try {
            const existedUser = await this.usersService.get(decodedIdToken.uid);
            if (!existedUser) throw new NotFoundException();

            const response: UserResponse = {
                id: existedUser.id,
                email: existedUser.email,
            };
            return response;
        } catch (error) {
            throw error;
        }
    }
}
