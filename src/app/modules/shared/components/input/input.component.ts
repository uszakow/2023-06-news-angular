import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() value = '';
  @Input() label = '';
  @Input() type: 'text' | 'password' | 'textarea' = 'text';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() rowsCount = 10;
  @Output() valueChange = new EventEmitter<string>();

  onChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}
