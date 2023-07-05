import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { UserInterface } from 'src/interfaces/User.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: UserInterface | null = null;

  constructor(private stateService: StateService) {}

  logout(): void {
    localStorage.removeItem('token');
    this.stateService.updateUser();
  }

  ngOnInit(): void {
    this.stateService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
