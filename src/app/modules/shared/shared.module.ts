import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ButtonComponent } from './components/button/button.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { IconComponent } from './components/icon/icon.component';
import { InputComponent } from './components/input/input.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TypographyComponent } from './components/typography/typography.component';
import { FormatMessagePipe } from './pipes/format-message.pipe';
import { ShowNewsCountPipe } from './pipes/show-news-count.pipe';
import { HideOnMouseleaveDirective } from './directives/hide-on-mouseleave.directive';

@NgModule({
  declarations: [
    NotFoundComponent,
    ButtonComponent,
    DropdownComponent,
    ErrorMessageComponent,
    IconComponent,
    InputComponent,
    ModalComponent,
    TabsComponent,
    TypographyComponent,
    FormatMessagePipe,
    ShowNewsCountPipe,
    HideOnMouseleaveDirective,
  ],
  exports: [
    NotFoundComponent,
    ButtonComponent,
    DropdownComponent,
    ErrorMessageComponent,
    IconComponent,
    InputComponent,
    ModalComponent,
    TabsComponent,
    TypographyComponent,
    FormatMessagePipe,
    ShowNewsCountPipe,
    HideOnMouseleaveDirective,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
