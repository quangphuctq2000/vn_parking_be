import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '@modules/users/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    // @Post()
    // async create(@Req() request: Request) {
    //     this.usersService.create();
    // }

    Get() {}
}
