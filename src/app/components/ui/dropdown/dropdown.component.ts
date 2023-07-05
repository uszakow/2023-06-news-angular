import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() type: 'simple' = 'simple';
  @ContentChild('titleTemplate') titleTemplate: TemplateRef<any>;
  @ContentChild('contentTemplate') contentTemplate: TemplateRef<any>;

  isOpen = false;

  setIsOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
  }

  get dropdownClasses(): string {
    return `dropdown ${this.type} relative`;
  }
  get drodpownContentClasses(): string {
    return `${!this.isOpen ? 'none' : ''} dropdown-content`;
  }
}
