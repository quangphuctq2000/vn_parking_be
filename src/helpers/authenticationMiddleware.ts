import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        let token;
        console.log(req.headers);

        if (req && req.headers && req.headers.authorization) {
            const parts = req.headers.authorization.split(/\s+/);
            if (parts[0].toLowerCase() == 'bearer' && parts.length == 2) {
                token = parts[1];
                console.log(token);

                const decodedIdToken = await this.authService.checkToken(token);

                if (decodedIdToken) {
                    req.body.userId = decodedIdToken.uid;
                    return next();
                }
            }
        }

        throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
}
