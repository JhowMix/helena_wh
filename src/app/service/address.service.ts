import {Injectable} from '@angular/core';
import {APIService} from './api.service';
import {Observable} from 'rxjs';
import {Address} from '../model/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private resource = (url: string = '') => `${APIService.API_URL}/addresses/${url}`;

  constructor(
    private apiSvc: APIService
  ) { }

  fetchLocation(cep: string): Observable<Address> {
    return this.apiSvc.http.get<Address>(this.resource(`${cep}/location`));
  }
}
