import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateUsernameDto {
  @Expose()
  username!: string;
}
