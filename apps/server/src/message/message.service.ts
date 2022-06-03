import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  current() {
    return 'Yo!';
  }
}
