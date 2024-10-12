import { Injectable } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';

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

    if (this.messages[parseId]) return this.messages[parseId];
    return `Error to find msg by id ${id}`;
  }

  createNewMsg(body: any) {
    this.lastId++;
    const id = this.lastId;
    const newMsg = {
      id,
      ...body,
    };

    this.messages.push(newMsg);

    return `Created new msg ${JSON.stringify(newMsg)}`;
  }

  updateMsgById(id: string, body: any) {
    const existMsgIndex = this.messages.findIndex(item => +item.id === +id);

    if (existMsgIndex >= 0) {
      const existMsg = this.messages[existMsgIndex];

      this.messages[existMsgIndex] = {
        ...existMsg,
        ...body,
      };
    }

    return `Updated msg by id ${id}`;
  }

  deleteMsgById(id: string) {
    const existMsgIndex = this.messages.findIndex(item => +item.id === +id);

    if (existMsgIndex >= 0) this.messages.splice(existMsgIndex, 1);

    return `Deleted msg by id ${id}`;
  }
}
