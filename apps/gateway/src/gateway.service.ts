import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  getHello(): string {
    return 'Welcome to FPass challenge!';
  }
}
