import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, MinLength, Matches, Min } from 'class-validator';
import { IsUnique } from '../../database-validation/unique.decorator';
import { User } from '../user.entity';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsUnique(User)
  @IsNotEmpty()
  @MinLength(3)
  username!: string;

  @Expose()
  @IsNotEmpty()
  @MinLength(4)
  @Matches(/[a-zA-Z]/, { message: 'password must have at least 1 letter and 1 number' })
  @Matches(/[0-9]/, { message: 'password must have at least 1 letter and 1 number' })
  password!: string;

  @Expose()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsNotEmpty()
  @Min(18)
  age!: number;
}
