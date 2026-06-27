import { Injectable } from '@nestjs/common';

@Injectable()
export class ProviderServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
