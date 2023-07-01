import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' | 'danger' | 'inline' | 'adding' =
    'primary';
  @Input() label: string;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() classes: string = '';
  @Output() click = new EventEmitter();
}
