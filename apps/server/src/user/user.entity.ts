import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  passwordHash!: string;

  get dto(): UserDto {
    return {
      id: this.id,
      username: this.username,
    };
  }
}
