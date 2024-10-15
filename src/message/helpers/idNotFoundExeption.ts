import { NotFoundException } from '@nestjs/common';

export default function idNotFoundExeption(existMsgIndex: number, id: number) {
  if (existMsgIndex < 0)
    throw new NotFoundException(`Error to find msg by id ${id}`);
}
