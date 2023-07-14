import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StateService } from 'src/app/services/state.service';
import { UserInterface } from 'src/interfaces/User.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: UserInterface | null;

  constructor(
    private titleService: Title,
    private stateService: StateService
  ) {}

  logout(): void {
    localStorage.removeItem('token');
    this.stateService.updateUser();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Strona użytkownika');
    this.stateService.updateUser();

    this.stateService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
