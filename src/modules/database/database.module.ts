import { Global, Module } from '@nestjs/common';
import {  dataSource } from './database.service';
import { DataSource } from 'typeorm';

@Global()
@Module({
  providers: [dataSource],
  exports: [dataSource],
})
export class DatabaseModule {}
