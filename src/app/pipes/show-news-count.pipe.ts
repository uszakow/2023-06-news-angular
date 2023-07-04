import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showNewsCount',
})
export class ShowNewsCountPipe implements PipeTransform {
  transform(count: number): string {
    return `${count} ${count === 1 ? 'wiadomość' : 'wiadomości'}`;
  }
}
