import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';
import {City} from '../model/city.model';
import {UF} from '../model/uf.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private resource = (url: string = '') => `${APIService.API_URL}/cities/${url}`;

  constructor(
    private apiSvc: APIService
  ) {
  }

  fetchByUf(uf: UF): Observable<City[]> {
    return this.apiSvc.http.get<City[]>(this.resource(`uf/${uf.code}`));
  }
}
