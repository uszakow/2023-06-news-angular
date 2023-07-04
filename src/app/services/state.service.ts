import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserInterface } from 'src/interfaces/User.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private userService: UserService) {}

  private loadingSubject = new BehaviorSubject<boolean>(true);
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userSubject = new BehaviorSubject<UserInterface | null>(null);

  loading$ = this.loadingSubject.asObservable();
  token$ = this.tokenSubject.asObservable();
  user$ = this.userSubject.asObservable();

  updateLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  updateUser(): void {
    this.updateLoading(true);
    const token = localStorage.getItem('token');

    if (token) {
      this.userService
        .getUser(token)
        .pipe(
          tap((user: UserInterface) => {
            this.tokenSubject.next(token);
            this.userSubject.next(user);
          })
        )
        .subscribe();
    } else {
      this.tokenSubject.next(null);
      this.userSubject.next(null);
    }

    this.updateLoading(false);
  }

  // getter for a value from the state, without subscribe function
  getToken(): string | null {
    return this.tokenSubject.getValue();
  }
}
