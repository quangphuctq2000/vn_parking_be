import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('parking-stations')
export class ParkingStationsController {
  @Post()
  async create(@Req() request: Request) {
    console.log(request.body);

    return 'success';
  }

  @Get()
  async findAll() {
    return 'parking stations';
  }
}
