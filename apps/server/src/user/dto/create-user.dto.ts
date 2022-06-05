import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { IsUnique } from '../../database-validation/unique.decorator';
import { User } from '../user.entity';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  @IsUnique(User)
  username!: string;

  @Expose()
  @IsNotEmpty()
  password!: string;

  @Expose()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsNotEmpty()
  age!: number;
}
