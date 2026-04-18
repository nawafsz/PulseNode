import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    if (!email) throw new HttpException('Email required', HttpStatus.BAD_REQUEST);
    return this.authService.forgotPassword(email);
  }

  @Post('login')
  async login(@Body() body: any) {
    const { email, name, username } = body;
    if (!email || !name || !username) throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
    return this.authService.login(email, name, username);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: any) {
    const { token, password } = body;
    if (!token || !password) throw new HttpException('Token and password required', HttpStatus.BAD_REQUEST);
    return this.authService.resetPassword(token, password);
  }
}
