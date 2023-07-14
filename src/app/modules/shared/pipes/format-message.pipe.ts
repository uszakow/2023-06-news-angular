import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMessage',
})
export class FormatMessagePipe implements PipeTransform {
  transform(message: string | string[]): string {
    if (Array.isArray(message)) {
      return message.join(' ');
    }
    return message;
  }
}
