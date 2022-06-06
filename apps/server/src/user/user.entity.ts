import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, Min, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsUnique } from '../database-validation/unique.decorator';
import { UserDto } from './user.dto';

@Entity()
@Exclude()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Expose()
  @IsUnique(User)
  @IsNotEmpty()
  @MinLength(3)
  username!: string;

  @Column()
  passwordHash!: string;

  @Column()
  @Expose()
  @IsNotEmpty()
  name!: string;

  @Column()
  @Expose()
  @IsNotEmpty()
  @Min(18)
  age!: number;

  get dto(): UserDto {
    return {
      id: this.id,
      username: this.username,
      age: this.age,
      name: this.name,
      _: () => 'user.dto',
    };
  }
}
