import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateUserDto {
  @Expose()
  name!: string;
  @Expose()
  age!: number;
}
