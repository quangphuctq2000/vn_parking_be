import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  @Post()
  create(@Req() request: Request) {}

  Get() {}
}
