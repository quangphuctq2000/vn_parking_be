import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { AuthMiddleware } from '@/helpers/authenticationMiddleware';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [VehicleController],
    providers: [VehicleService],
    imports: [UsersModule],
    exports: [VehicleService],
})
export class VehicleModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'vehicle', method: RequestMethod.POST },
                { path: 'vehicle', method: RequestMethod.GET },
                { path: 'vehicle/:id', method: RequestMethod.GET },
            );
    }
}
