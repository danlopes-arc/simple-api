import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

@Exclude()
export class UpdateUserDto {
  @Expose()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsNotEmpty()
  @Min(18)
  age!: number;
}
