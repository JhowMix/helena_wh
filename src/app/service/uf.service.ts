import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {UF} from '../model/uf.model';
import {Observable, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Config } from 'codelyzer';

@Injectable({
  providedIn: 'root'
})
export class UfService {

  private resource = (url: string = '') => `/ufs/${url}`;

  constructor(
    private apiSvc: APIService
  ) { }

  getAll() {
    return this.apiSvc.get(this.resource(''))
      .pipe(
        map(res => {
          return res.body;
        }),
        retry(3),
        catchError(error => {
          console.error(error.error);
          return throwError('Algo deu errado! Tente novamente mais tarde.');
        })
      );
  }
}
