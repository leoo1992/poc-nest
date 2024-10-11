import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

@Controller('recados')
export class RecadosController
{
  @HttpCode(HttpStatus.OK)
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
  create(@Body() body:any )
  {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body:any )
  {
    return {
      id,
      ...body
    };
  }

}
