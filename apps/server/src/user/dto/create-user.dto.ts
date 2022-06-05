import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
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
