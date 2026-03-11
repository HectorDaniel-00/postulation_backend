import { Controller, Get } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

ApiTags('Default');
@ApiSecurity('x-api-key')
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
