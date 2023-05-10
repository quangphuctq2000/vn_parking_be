import {
    Global,
    MiddlewareConsumer,
    Module,
    RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { app } from './firebase';
import { AuthMiddleware } from '@/helpers/authenticationMiddleware';

@Global()
@Module({
    providers: [
        {
            provide: 'APP',
            useValue: app,
        },
        AuthService,
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'auth/user-info', method: RequestMethod.PUT },
                { path: 'auth/user-auth-info', method: RequestMethod.PUT },
                { path: 'auth/user', method: RequestMethod.PUT },
            );
    }
}
