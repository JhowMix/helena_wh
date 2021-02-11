import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {Item} from '../model/item.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private resource = (url: string = '') => `${APIService.API_URL}/itens/${url}`;

  constructor(
    private apiSvc: APIService
  ) {
  }

  create(item: Item): Observable<Item> {
    return this.apiSvc.http.post<Item>(this.resource(), item);
  }

  all(): Observable<Item[]> {
    return this.apiSvc.http.get<Item[]>(this.resource());
  }
}
