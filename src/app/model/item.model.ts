import {Supplier} from './supplier.model';
import {PayloadFileWrapper} from './payload-file-wrapper.model';

export interface Item {
  id?: number;
  name?: string;
  details?: string;
  images: any[];
  suppliers: Supplier[];
  createdAt: Date;
  payload: PayloadFileWrapper[];
}
