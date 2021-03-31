import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from '../model/user.model';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private resource = (url: string = '') => `/users/${url}`;

  constructor(
    private apiSvc: APIService
  ) { }


  hasUserByUsername(username: string) {
    return this.apiSvc.get(this.resource(`search?query=${username}`))
      .pipe(
        map(res => {
          if (res.status === 200)
            return true;
          return false;
        }),
        retry(3),
        catchError(error => {
          console.error(error.error);
          return throwError('Algo deu errado! Tente novamente mais tarde.');
        })
      )
  }

  create(user: User): Observable<User> {
    return this.apiSvc.http.post<User>(APIService.API_URL + this.resource(), user);
  }

  all(): Observable<User[]> {
    return this.apiSvc.http.get<User[]>(APIService.API_URL + this.resource(''));
  }
}
