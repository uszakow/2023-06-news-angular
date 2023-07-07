import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @ContentChild('titleTemplate') titleTemplate: TemplateRef<any>;
  @ContentChild('contentTemplate') contentTemplate: TemplateRef<any>;

  // an example of adding classes without the appHideOnMouseleave directive
  // isOpen = false;
  // setIsOpen(isOpen: boolean): void {
  //   this.isOpen = isOpen;
  // }
  // get drodpownContentClasses(): string {
  //   return `${!this.isOpen ? 'none' : ''} dropdown-content`;
  // }
}
