import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log("Founded by AweiP");
    return '且愿饮冰而热血不凉';
  }
}
