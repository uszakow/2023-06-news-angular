import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from './services/state.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  private routerSubscription: Subscription;
  private unauthorizedErrorSubscription: Subscription;

  ngOnInit(): void {
    this.stateService.updateUser();

    // loader when route changing
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.stateService.updateLoading(true);
      }
      if (event instanceof NavigationEnd) {
        this.stateService.updateLoading(false);
      }
    });

    // manage incorrect token
    this.unauthorizedErrorSubscription = this.apiService
      .getUnauthorizedErrorSubject()
      .subscribe(() => {
        localStorage.removeItem('token');
        this.stateService.updateUser();
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.unauthorizedErrorSubscription.unsubscribe();
  }
}
