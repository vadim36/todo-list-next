import { Controller, Get } from "@nestjs/common";

@Controller()
export default class AppController {
  @Get('test')
  test() {
    return 'ok' 
  }
}