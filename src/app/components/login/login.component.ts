import { Component, OnInit } from '@angular/core';
import { TabItemInterface } from 'src/interfaces/TabItem.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  tabs: TabItemInterface[] = [
    { id: 'login', label: 'Zaloguj się' },
    { id: 'registration', label: 'Utwórz konto' },
  ];

  activeTab: string = this.tabs[0].id;

  name: string = '';
  password: string = '';
  loading: boolean = false;
  error: string = '';

  setActiveTab = (newActiveTab: string): void => {
    this.activeTab = newActiveTab;
  };

  test() {
    console.log('test')
  }
}
