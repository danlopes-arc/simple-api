import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async findUserByCredentials(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.passwordHash === password) {
      return user;
    }
    return null;
  }

  generateToken(user: User): string {
    return this.jwtService.sign({ sub: user.id });
  }
}
