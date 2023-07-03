import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
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
  constructor(
    private stateService: StateService,
    private userService: UserService
  ) {}

  tabs: TabItemInterface[] = [
    { id: 'login', label: 'Zaloguj się' },
    { id: 'registration', label: 'Utwórz konto' },
  ];

  activeTab: string = this.tabs[0].id;
  name: string = '';
  password: string = '';
  loading: boolean = false;
  error: string | string[] = '';

  private timeout: ReturnType<typeof setTimeout>;

  private showError(errorMessage: string | string[]): void {
    this.error = errorMessage;

    this.timeout = setTimeout(() => {
      this.error = '';
    }, 5000);
  }

  setActiveTab = (newActiveTab: string): void => {
    this.activeTab = newActiveTab;
  };

  loginUser = async () => {
    this.stateService.updateLoading(true);

    const body = {
      name: this.name,
      password: this.password,
    };

    this.userService.loginUser(body).subscribe({
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
      complete: () => {
        this.stateService.updateLoading(false);
      },
    });
  };

  createUser() {
    this.stateService.updateLoading(true);

    const body = {
      name: this.name,
      password: this.password,
    };

    this.userService.createUser(body).subscribe({
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
      complete: () => {
        this.stateService.updateLoading(false);
      },
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }
}
