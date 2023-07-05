import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' | 'danger' | 'inline' | 'adding' =
    'primary';
  @Input() label = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() classes = '';
  @Output() clickButton = new EventEmitter();
}
