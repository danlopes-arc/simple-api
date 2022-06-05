import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthUser } from './auth-user.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@AuthUser() authUser: User): string {
    return this.authService.generateToken(authUser);
  }
}
