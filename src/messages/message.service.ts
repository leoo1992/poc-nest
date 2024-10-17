import { Injectable } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import idNotFoundExeption from '../helpers/idNotFoundExeption';
import { UserService } from 'src/users/user.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly userService: UserService,
  ) {}

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const messagesPromise = await this.messageRepository.find({
      take: limit,
      skip: offset,
      relations: ['from', 'to'],
      order: {
        id: 'desc',
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });

    if (messagesPromise.length === 0) return 'No have data';
    return messagesPromise;
  }

  async findOne(id: number) {
    const messagePromise = await this.messageRepository.findOne({
      where: { id },
      relations: ['from', 'to'],
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });

    if (messagePromise) {
      return messagePromise;
    } else {
      idNotFoundExeption(messagePromise, id);
    }
  }

  async create(createDto: CreateMessageDto) {
    const { fromId, toId } = createDto;
    const messageTo = await this.userService.findOne(toId);
    const messageFrom = await this.userService.findOne(fromId);

    const newMsg = {
      text: createDto.text,
      from: messageFrom,
      to: messageTo,
      read: false,
      date: new Date(),
    };
    const messagePromise = this.messageRepository.create(newMsg);
    await this.messageRepository.save(messagePromise);
    return {
      ...messagePromise,
      from: { id: messagePromise.from.id, name: messagePromise.from.name },
      to: { id: messagePromise.to.id, name: messagePromise.to.name },
    };
  }

  async update(id: number, updateDto: UpdateMessageDto) {
    const findMessagePromise = await this.findOne(id);

    findMessagePromise.text = updateDto?.text ?? findMessagePromise.text;
    findMessagePromise.read = updateDto?.read ?? findMessagePromise.read;

    return await this.messageRepository.save(findMessagePromise);
  }

  async remove(id: number) {
    const messagePromise = await this.messageRepository.findOneBy({
      id,
    });

    if (!messagePromise) {
      idNotFoundExeption(messagePromise, id);
    }

    return await this.messageRepository.remove(messagePromise);
  }
}
