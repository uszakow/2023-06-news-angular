import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() label: string = '';
  @Input() type: 'text' | 'password' | 'textarea' = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() rowsCount: number = 10;

  onChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}
