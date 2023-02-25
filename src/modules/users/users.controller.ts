import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async create(@Req() request: Request) {
    this.usersService.create();
  }

  Get() {}
}
