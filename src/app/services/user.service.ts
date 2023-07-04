import { Injectable } from '@angular/core';
import { UserDto } from 'src/interfaces/User.dto';
import { Observable, map } from 'rxjs';
import { UserInterface } from 'src/interfaces/User.interface';
import { CustomResponseInterface } from 'src/interfaces/CustomResponse.interface';
import { ApiService } from './api.service';
import { UpdateUserDto } from 'src/interfaces/UpdateUser..dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  createUser(body: UserDto): Observable<CustomResponseInterface> {
    return this.apiService.post<CustomResponseInterface>('user', body);
  }

  loginUser(body: UserDto): Observable<string> {
    return this.apiService
      .post<{ token: string }>('user/login', body)
      .pipe(map((response) => response.token));
  }

  getUser(token: string): Observable<UserInterface> {
    return this.apiService.get<UserInterface>('user', token);
  }

  updateUser(body: UpdateUserDto, token: string): Observable<void> {
    return this.apiService.put('user', body, token);
  }

  deleteUser(token: string): Observable<void> {
    return this.apiService.delete('user', token);
  }
}
