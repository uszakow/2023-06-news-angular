import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';
import { CustomResponseInterface } from 'src/interfaces/CustomResponse.interface';
import { TabItemInterface } from 'src/interfaces/TabItem.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  tabs: TabItemInterface[] = [
    { id: 'login', label: 'Zaloguj się' },
    { id: 'registration', label: 'Utwórz konto' },
  ];

  activeTab = this.tabs[0].id;
  name = '';
  password = '';
  loading = false;
  error: string | string[] = '';

  private timeout: ReturnType<typeof setTimeout>;

  constructor(
    private stateService: StateService,
    private userService: UserService
  ) {}

  private showError(errorMessage: string | string[]): void {
    this.error = errorMessage;

    this.timeout = setTimeout(() => {
      this.error = '';
    }, 5000);
  }

  setActiveTab(newActiveTab: string): void {
    this.activeTab = newActiveTab;
  }

  async loginUser(): Promise<void> {
    this.loading = true;

    const body = {
      name: this.name,
      password: this.password,
    };

    this.userService
      .loginUser(body)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (token: string) => {
          if (token) {
            localStorage.setItem('token', token);
          }

          this.stateService.updateUser();
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage =
            error.error?.message ||
            'Nie udało się zalogować, prosimy spróbować później';
          this.showError(errorMessage);
        },
      });
  }

  createUser(): void {
    this.loading = true;

    const body = {
      name: this.name,
      password: this.password,
    };

    this.userService
      .createUser(body)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response: CustomResponseInterface) => {
          if (response.statusCode === 201) {
            this.loginUser();
          }
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage =
            error.error?.message || 'Nie udało się stworzyć konto użytkownika';
          this.showError(errorMessage);
        },
      });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }
}
