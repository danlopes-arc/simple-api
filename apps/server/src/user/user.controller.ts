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
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUsernameDto } from './dto/update-username.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(createUserDto);
    return user.dto;
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  async findCurrent(@AuthUser() user: User): Promise<UserDto> {
    return user.dto;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const user = await this.userService.findById(id);
    if (user == null) {
      throw new NotFoundException();
    }
    return user.dto;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    const user = await this.userService.update(id, updateUserDto);
    return user.dto;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.userService.remove(id);
  }

  @Put(':id/username')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUsername(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsernameDto: UpdateUsernameDto
  ): Promise<UserDto> {
    console.log(updateUsernameDto);
    const user = await this.userService.update(id, updateUsernameDto);
    return user.dto;
  }
}
