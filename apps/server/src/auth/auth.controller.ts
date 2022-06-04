import { Controller, Post, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/user.entity';
import { AuthUser } from './auth-user.decorator';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@AuthUser() authUser: User): Promise<UserDto> {
    return authUser.dto;
  }
}
