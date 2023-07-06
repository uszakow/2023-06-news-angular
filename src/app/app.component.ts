import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from './services/state.service';
import { Subscription, combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unauthorizedErrorSubscription: Subscription;
  private redirectSubscription: Subscription;

  loading: boolean;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.stateService.loading$.subscribe((loading) => {
      this.loading = loading;
      this.cd.detectChanges();
    });

    this.stateService.updateUser();

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
    this.unauthorizedErrorSubscription.unsubscribe();
    this.redirectSubscription.unsubscribe();
  }
}
