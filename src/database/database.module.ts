import { Global, Module } from '@nestjs/common';
import { dataSource } from './database.service';

@Global()
@Module({
    providers: [dataSource],
    exports: [dataSource],
})
export class DatabaseModule {}
