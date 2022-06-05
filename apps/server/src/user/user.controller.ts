import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Get,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(createUserDto);
    return user.dto;
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  async current(@AuthUser() user: User): Promise<UserDto> {
    return user.dto;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    console.log(typeof id);
    const user = await this.userService.findById(id);
    if (user == null) {
      throw new NotFoundException();
    }
    return user.dto;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    const user = await this.userService.update(id, updateUserDto);
    return user.dto;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.userService.remove(id);
  }
}
