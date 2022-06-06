import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthUser } from '../auth/auth-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParsingPipe } from '../utils/parsing.pipe';
import { CreateUserDto, UpdateUserDto, UpdateUsernameDto, UserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ParsingPipe)
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

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ParsingPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    const user = await this.userService.update(id, updateUserDto);

    if (user == null) {
      throw new NotFoundException();
    }

    return user.dto;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const existed = await this.userService.remove(id);

    if (!existed) {
      throw new NotFoundException();
    }
  }

  @Put(':id/username')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ParsingPipe)
  async updateUsername(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsernameDto: UpdateUsernameDto
  ): Promise<UserDto> {
    const user = await this.userService.update(id, updateUsernameDto);

    if (user == null) {
      throw new NotFoundException();
    }

    return user.dto;
  }
}
