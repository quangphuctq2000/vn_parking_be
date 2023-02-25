import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Users } from '../database/models/users';
@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async create() {
    const result = await this.dataSource.getRepository(Users).find();
    console.log(result);
  }
}
