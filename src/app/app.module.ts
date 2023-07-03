import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { DropdownComponent } from './components/ui/dropdown/dropdown.component';
import { ErrorMessageComponent } from './components/ui/error-message/error-message.component';
import { InputComponent } from './components/ui/input/input.component';
import { LoaderComponent } from './components/ui/loader/loader.component';
import { ModalComponent } from './components/ui/modal/modal.component';
import { TabsComponent } from './components/ui/tabs/tabs.component';
import { TypographyComponent } from './components/ui/typography/typography.component';
import { HttpClientModule } from '@angular/common/http';
import { FormatMessagePipe } from './pipes/format-message.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsDetailsComponent,
    LoginComponent,
    ProfileComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    DropdownComponent,
    ErrorMessageComponent,
    InputComponent,
    LoaderComponent,
    ModalComponent,
    TabsComponent,
    TypographyComponent,
    FormatMessagePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
