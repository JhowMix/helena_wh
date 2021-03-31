import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'codelyzer';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  static readonly API_URL = environment.url;

  constructor(
    public http: HttpClient
  ) { }

  get(resource: string): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(APIService.API_URL + resource, {observe: 'response'})
  }

  post(data: any, resource: string): Observable<HttpResponse<Config>> {
    return this.http.post<Config>(APIService.API_URL + resource, data, {observe: 'response'})
  }
}
