import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';
import {Supplier} from '../model/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private resource = (url: string = '') => `${APIService.API_URL}/suppliers/${url}`;

  constructor(
    private apiSvc: APIService
  ) { }

  all(pagination: boolean = false): Observable<Supplier[]> {
    return this.apiSvc.http.get<Supplier[]>(this.resource());
  }

  create(supplier: Supplier): Observable<any> {
    return this.apiSvc.http.post<Supplier>(this.resource(), supplier);
  }
}
