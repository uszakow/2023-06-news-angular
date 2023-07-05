import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateUserDto } from 'src/interfaces/UpdateUser..dto';

@Component({
  selector: 'app-profile-data-change',
  templateUrl: './profile-data-change.component.html',
})
export class ProfileDataChangeComponent {
  isModalOpen = false;
  modalName: 'name' | 'password' | 'delete' | '' = '';
  name = '';
  password = '';
  passwordConfirmation = '';
  loading = false;
  error = '';

  constructor(
    private stateService: StateService,
    private userService: UserService
  ) {}

  openChangeNameModal(): void {
    this.modalName = 'name';
    this.isModalOpen = true;
  }
  openChangePasswordModal(): void {
    this.modalName = 'password';
    this.isModalOpen = true;
  }
  openDeleteProfileModal(): void {
    this.modalName = 'delete';
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.name = '';
    this.password = '';
    this.passwordConfirmation = '';
    this.error = '';
    this.modalName = '';
    this.isModalOpen = false;
  }

  changeUserData(field: 'name' | 'password') {
    if (this.password !== this.passwordConfirmation) {
      this.error = 'Hasła się różnią.';
      return;
    }

    const body: UpdateUserDto = {};
    if (field === 'name') {
      body.name = this.name;
    }
    if (field === 'password') {
      body.password = this.password;
    }

    const token = this.stateService.getToken();
    if (token) {
      this.loading = true;
      this.userService
        .updateUser(body, token)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: () => {
            this.stateService.updateUser();
            this.closeModal();
          },
          error: (error: HttpErrorResponse) => {
            this.error =
              error.error?.message || 'Nie udało się zmienić nazwy użytkownika';
          },
        });
    }
  }

  deleteUser() {
    const token = this.stateService.getToken();
    if (token) {
      this.loading = true;
      this.userService
        .deleteUser(token)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: () => {
            this.stateService.updateUser();
            this.closeModal();
          },
          error: (error: HttpErrorResponse) => {
            this.error =
              error.error?.message || 'Nie udało się usunąć konto użytkownika';
          },
        });
    }
  }

  getModalTitle(): string {
    switch (this.modalName) {
      case 'name':
        return 'Zmień nazwę użytkownika';
      case 'password':
        return 'Zmień hasło';
      case 'delete':
        return 'Usuń dane konto';
      default:
        return '';
    }
  }
}
