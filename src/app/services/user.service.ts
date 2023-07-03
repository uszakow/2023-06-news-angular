import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto } from 'src/interfaces/User.dto';
import { BASE_URL } from 'config';
import { Observable, map } from 'rxjs';
import { getRequestOptions } from 'src/helpers/getRequestOptions';
import { UserInterface } from 'src/interfaces/User.interface';
import { CustomResponseInterface } from 'src/interfaces/CustomResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(body: UserDto): Observable<CustomResponseInterface> {
    return this.http.post<CustomResponseInterface>(`${BASE_URL}/user`, body);
  }

  loginUser(body: UserDto): Observable<string> {
    return this.http
      .post<{ token: string }>(`${BASE_URL}/user/login`, body)
      .pipe(map((response) => response.token));
  }

  getUser(token: string): Observable<UserInterface> {
    const headers = getRequestOptions(token);
    return this.http.get<UserInterface>(`${BASE_URL}/user`, { headers });
  }
}
