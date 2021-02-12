import {Phone} from './phone.model';

export interface Supplier {
  id?: number;
  name: string;
  cnpj?: string;
  stateSub?: string;
  email?: string;
  phones?: Phone[];
  addresses?: any[];
  createdAt: Date;
}
