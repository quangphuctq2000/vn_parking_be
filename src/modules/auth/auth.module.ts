import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
    imports: [UsersModule],
})
export class AuthModule {}
