import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '且愿饮冰而热血不凉';
  }
}
