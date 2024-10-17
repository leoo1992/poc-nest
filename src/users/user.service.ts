import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import idNotFoundExeption from 'src/helpers/idNotFoundExeption';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'asc',
      },
    });

    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (user) {
      return user;
    } else {
      idNotFoundExeption(user, id);
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = {
        name: createUserDto.name,
        passwordHash: createUserDto.password,
        email: createUserDto.email,
      };
      const newUserPromise = this.userRepository.create(newUser);

      return await this.userRepository.save(newUserPromise);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('This email already exists');
      }

      throw e;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const partialDto = {
      name: updateUserDto?.name,
      passwordHash: updateUserDto?.password,
    };
    const updateUserPromise = await this.userRepository.preload({
      id,
      ...partialDto,
    });

    if (!updateUserPromise) {
      idNotFoundExeption(updateUserPromise, id);
    }

    return await this.userRepository.save(updateUserPromise);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) idNotFoundExeption(user, id);

    return await this.userRepository.remove(user);
  }
}
