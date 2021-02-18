import {Supplier} from './supplier.model';
import {PayloadFileWrapper} from './payload-file-wrapper.model';
import { Measurement } from './measurement.model';

export interface Item {
  id?: number;
  name?: string;
  details?: string;
  images: any[];
  measurement: Measurement;
  suppliers: Supplier[];
  createdAt: Date;
  payload: PayloadFileWrapper[];
}
