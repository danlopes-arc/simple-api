import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
import { IsUnique } from '../../database-validation/unique.decorator';
import { User } from '../user.entity';

@Exclude()
export class UpdateUsernameDto {
  @Expose()
  @IsUnique(User)
  @IsNotEmpty()
  @MinLength(3)
  username!: string;
}
