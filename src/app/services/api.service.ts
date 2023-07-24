import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3052';
  private unauthorizedErrorSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  private getHeaders(token?: string): HttpHeaders {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  getUnauthorizedErrorSubject(): Subject<void> {
    return this.unauthorizedErrorSubject;
  }

  private handleResponseError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      // emit notification about unauthorized error
      this.unauthorizedErrorSubject.next();
    }
    return throwError(() => error);
  }

  get<T>(url: string, token?: string): Observable<T> {
    const headers = this.getHeaders(token);
    return this.http
      .get<T>(`${this.baseUrl}/${url}`, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleResponseError(error)
        )
      );
  }

  post<T>(url: string, body: any, token?: string): Observable<T> {
    const headers = this.getHeaders(token);
    return this.http
      .post<T>(`${this.baseUrl}/${url}`, body, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleResponseError(error)
        )
      );
  }

  put<T>(url: string, body: any, token: string): Observable<T> {
    const headers = this.getHeaders(token);
    return this.http
      .put<T>(`${this.baseUrl}/${url}`, body, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleResponseError(error)
        )
      );
  }

  delete<T>(url: string, token: string): Observable<T> {
    const headers = this.getHeaders(token);
    return this.http
      .delete<T>(`${this.baseUrl}/${url}`, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.handleResponseError(error)
        )
      );
  }
}
