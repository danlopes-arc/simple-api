import { Expose } from 'class-transformer';
import { IsNotEmpty, MinLength, Matches, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsUnique } from '../database-validation/unique.decorator';
import { UserDto } from './user.dto';

@Entity()
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
  @Expose()
  @IsNotEmpty()
  @MinLength(4)
  @Matches(/[a-zA-Z]/, { message: 'password must have at least 1 letter and 1 number' })
  @Matches(/[0-9]/, { message: 'password must have at least 1 letter and 1 number' })
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
