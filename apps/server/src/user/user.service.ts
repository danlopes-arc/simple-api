import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...createUserDto,
      passwordHash: createUserDto.password,
    });
    return this.userRepository.save(user);
  }

  findById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async findByCredentials(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && user.passwordHash === password) {
      return user;
    }
    return null;
  }

  async update(id: number, updateUserDto: UpdateUserDto | UpdateUsernameDto): Promise<User> {
    const user = await this.findById(id);

    if (user == null) {
      throw new NotFoundException();
    }

    await this.userRepository.update({ id }, updateUserDto);
    return Object.assign(user, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findById(id);

    if (user == null) {
      throw new NotFoundException();
    }

    return this.userRepository.delete({ id });
  }
}
