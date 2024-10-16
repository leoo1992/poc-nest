import { NotFoundException } from '@nestjs/common';

export default function idNotFoundExeption(existMsgIndex: any, id: number) {
  if (
    existMsgIndex < 0 ||
    existMsgIndex === null ||
    !existMsgIndex ||
    existMsgIndex === undefined
  )
    throw new NotFoundException(`Error to find by id ${id}`);
}
