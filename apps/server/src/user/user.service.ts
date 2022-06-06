import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...passwordlessCreateUserDto } = createUserDto;

    const passwordHash = await hash(password, 12);

    const user = this.userRepository.create({
      ...passwordlessCreateUserDto,
      passwordHash,
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

    if (user != null && (await compare(password, user.passwordHash))) {
      return user;
    }

    return null;
  }

  async update(id: number, updateUserDto: UpdateUserDto | UpdateUsernameDto): Promise<User | null> {
    const user = await this.findById(id);

    if (user == null) {
      return null;
    }

    return await this.userRepository.save(Object.assign(user, updateUserDto));
  }

  /**
   * @returns `true` if the entity was found, `false` otherwise
   */
  async remove(id: number): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id });

    if (user == null) {
      return false;
    }

    await this.userRepository.delete({ id });

    return true;
  }
}
