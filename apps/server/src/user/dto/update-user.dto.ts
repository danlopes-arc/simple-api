import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateUserDto {
  @Expose()
  username!: string;
  @Expose()
  name!: string;
  @Expose()
  age!: number;
}
