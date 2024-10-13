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
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

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
  create(@Body() createDto: CreateMessageDto) {
    return this.messageService.createNewMsg(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMessageDto) {
    return this.messageService.updateMsgById(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.deleteMsgById(id);
  }
}
