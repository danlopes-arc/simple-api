import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserDto {
  @Expose()
  username!: string;
  @Expose()
  password!: string;
  @Expose()
  name!: string;
  @Expose()
  age!: number;
}
