import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  // eslint-disable-next-line prettier/prettier
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 10 } = pagination;
    return this.messageService.findAllMsg(limit, offset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOneMsgById(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.messageService.createNewMsg(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.messageService.updateMsgById(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.deleteMsgById(id);
  }
}
