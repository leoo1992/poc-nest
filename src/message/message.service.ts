import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  private lastId = 1;
  private messages: MessageEntity[] = [
    {
      id: '1',
      text: 'test',
      from: 'Léo',
      to: 'Tester',
      read: false,
      date: new Date(),
    },
  ];

  findAllMsg(limit: number, offset: number) {
    return this.messages;
  }

  findOneMsgById(id: string) {
    const parseId = +id - 1;

    if (this.messages[parseId]) {
      return this.messages[parseId];
    } else {
      throw new NotFoundException(`Error to find msg by id ${id}`);
    }
  }

  createNewMsg(createDto: CreateMessageDto) {
    this.lastId++;
    const id = this.lastId.toString();
    const newMsg = {
      id,
      ...createDto,
      read: false,
      date: new Date(),
    };

    this.messages.push(newMsg);

    return `Created new msg ${JSON.stringify(newMsg)}`;
  }

  updateMsgById(id: string, updateDto: UpdateMessageDto) {
    const existMsgIndex = this.findMsgIndex(id);
    const existMsg = this.messages[existMsgIndex];

    this.idNotFoundExeption(existMsgIndex, id);

    this.messages[existMsgIndex] = {
      ...existMsg,
      ...updateDto,
    };

    return `Updated msg by id ${id}`;
  }

  deleteMsgById(id: string) {
    const existMsgIndex = this.findMsgIndex(id);

    this.idNotFoundExeption(existMsgIndex, id);
    this.messages.splice(existMsgIndex, 1);

    return `Deleted msg by id ${id}`;
  }

  //HELPERS
  findMsgIndex(id: string) {
    return this.messages.findIndex(item => +item.id === +id);
  }

  idNotFoundExeption(existMsgIndex: number, id: string) {
    if (existMsgIndex < 0)
      throw new NotFoundException(`Error to find msg by id ${id}`);
  }
}
