import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {UF} from '../model/uf.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UfService {

  private resource = (url: string = '') => `${APIService.API_URL}/ufs/${url}`;

  constructor(
    private apiSvc: APIService
  ) { }

  getAll(): Observable<UF[]> {
    return this.apiSvc.http.get<UF[]>(this.resource(''));
  }
}
