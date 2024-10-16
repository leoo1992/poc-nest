import { Injectable } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import idNotFoundExeption from '../helpers/idNotFoundExeption';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async findAllMsg(limit: number, offset: number) {
    const messagesPromise = await this.messageRepository.find();

    if (messagesPromise.length === 0) return 'No have data';
    return messagesPromise;
  }

  async findOneMsgById(id: number) {
    const messagePromise = await this.messageRepository.findOneBy({
      id,
    });

    if (messagePromise) {
      return messagePromise;
    } else {
      idNotFoundExeption(messagePromise, id);
    }
  }

  async createNewMsg(createDto: CreateMessageDto) {
    const newMsg = {
      ...createDto,
      read: false,
      date: new Date(),
    };
    const messagePromise = this.messageRepository.create(newMsg);

    return await this.messageRepository.save(messagePromise);
  }

  async updateMsgById(id: number, updateDto: UpdateMessageDto) {
    const partialDto = {
      read: updateDto?.read,
      text: updateDto?.text,
    };
    const messagePromise = await this.messageRepository.preload({
      id,
      ...partialDto,
    });

    if (!messagePromise) {
      idNotFoundExeption(messagePromise, id);
    }
    return await this.messageRepository.save(messagePromise);
  }

  async deleteMsgById(id: number) {
    const messagePromise = await this.messageRepository.findOneBy({
      id,
    });

    if (!messagePromise) {
      idNotFoundExeption(messagePromise, id);
    }

    return await this.messageRepository.remove(messagePromise);
  }
}
