import { Controller } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  findAll() {
    return 'all';
  }
  findOne() {
    return 'one';
  }
}
