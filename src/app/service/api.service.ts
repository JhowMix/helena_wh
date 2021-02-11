import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  static readonly API_URL = environment.url;

  constructor(
    public http: HttpClient
  ) { }
}
