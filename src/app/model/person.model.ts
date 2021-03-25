import {Phone} from './phone.model';
import {Address} from './address.model';

export interface Person {
  id?: number;
  name: string;
  birthDate: Date;
  rg: string;
  cpf: string;
  email: string;
  phones: Phone[];
  addresses: Address[];
  createdAt: Date;
}
