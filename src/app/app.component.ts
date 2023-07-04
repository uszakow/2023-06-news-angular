import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from './services/state.service';
import { Subscription, combineLatest } from 'rxjs';
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
    public stateService: StateService
  ) {}

  private routerSubscription: Subscription;
  private unauthorizedErrorSubscription: Subscription;
  private redirectSubscription: Subscription;

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

    // redirect for logged/unlogged users
    this.redirectSubscription = combineLatest([
      this.stateService.loading$,
      this.stateService.user$,
    ]).subscribe(([isLoading, user]) => {
      const pathname = this.router.url;

      if (!isLoading && !user && pathname === '/profile') {
        this.router.navigate(['/login']);
      }
      if (!isLoading && user && pathname === '/login') {
        this.router.navigate(['/profile']);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.unauthorizedErrorSubscription.unsubscribe();
    this.redirectSubscription.unsubscribe();
  }
}
