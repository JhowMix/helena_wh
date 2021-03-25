import {Injectable} from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {HttpResponse} from '@angular/common/http';
import {Config} from 'codelyzer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private resource = (url: string = '') => `${APIService.API_URL}/users/${url}`;

  constructor(
    private apiSvc: APIService
  ) { }

  hasUserByUsername(username: string): Observable<HttpResponse<Config>> {
    return this.apiSvc.http.get<Config>(this.resource(`search?query=${username}`), {observe: 'response'});
  }

  create(user: User): Observable<User> {
    return this.apiSvc.http.post<User>(this.resource(), user);
  }
}
