import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateUserDto {
  @Expose()
  username!: string;
}
