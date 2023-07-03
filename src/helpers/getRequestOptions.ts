import { HttpHeaders } from '@angular/common/http';

export const getRequestOptions = (token: string) => {
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
};
