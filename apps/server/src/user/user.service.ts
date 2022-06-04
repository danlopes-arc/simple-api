import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const user = this.userRepository.create({
      username,
      passwordHash: password,
    });
    return this.userRepository.save(user);
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (user == null) {
      throw new NotFoundException();
    }

    await this.userRepository.update({ id }, updateUserDto);
    return Object.assign(user, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (user == null) {
      throw new NotFoundException();
    }

    return this.userRepository.delete({ id });
  }
}
