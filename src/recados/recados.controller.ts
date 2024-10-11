import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  @Get()
  findAll() {
    return 'all';
  }

  @Get(':id')
  // eslint-disable-next-line prettier/prettier
  findOne(@Param('id') id: string)
  {
    return `one ${id}`;
  }

  @Post()
  create( )
  {
    return `create`;
  }

}
