import {City} from './city.model';

export interface Address {
  id?: number;
  placeDesc: string;
  district: string;
  zipCode: string;
  city: City;
}
