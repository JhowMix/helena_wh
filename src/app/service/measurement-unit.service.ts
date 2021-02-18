import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MeasurementUnit } from "../model/measurement-unit.model";
import { APIService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService {
  private resource = (url: string = '') => `${APIService.API_URL}/measurement-units/${url}`;

  constructor(
    private apiSvc: APIService
  ) { }

  all(): Observable<MeasurementUnit[]> {
    return this.apiSvc.http.get<MeasurementUnit[]>(this.resource());
  }
}