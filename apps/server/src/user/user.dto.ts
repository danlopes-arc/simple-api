import { PickType } from '@nestjs/mapped-types';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { User } from './user.entity';

export interface UserDto {
  id: number;
  username: string;
  name: string;
  age: number;
  /**
   * This makes User entity incompatible with this dto
   */
  _: () => 'user.dto';
}

@Exclude()
export class CreateUserDto extends PickType(User, ['username', 'name', 'age']) {
  @Expose()
  @IsNotEmpty()
  @MinLength(4)
  @Matches(/[a-zA-Z]/, { message: 'password must have at least 1 letter and 1 number' })
  @Matches(/[0-9]/, { message: 'password must have at least 1 letter and 1 number' })
  password!: string;
}

@Exclude()
export class UpdateUserDto extends PickType(User, ['name', 'age']) {}

@Exclude()
export class UpdateUsernameDto extends PickType(User, ['username']) {}
