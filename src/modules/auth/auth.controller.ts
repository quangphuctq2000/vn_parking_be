import { Body, Controller, Post } from '@nestjs/common';
import certificate from './../../../project-9f526-firebase-adminsdk-kzbop-7b87b3db21.json';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async checkToken(@Body() body) {
    const verifyResult = await this.authService.checkToken(body.token);
    console.log(verifyResult);

    return 'token';
  }
}
