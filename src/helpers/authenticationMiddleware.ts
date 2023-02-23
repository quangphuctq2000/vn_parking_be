import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let token;
    if (req && req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(/\s+/);
      if (parts[0].toLowerCase() == 'bearer' && parts.length == 2) {
        token = parts[1];
        req.body.user_id = await this.authService.checkToken(token);
        if (req.body.user_id) {
          return next();
        }
      }
    }

    return res.send('error');
  }
}
