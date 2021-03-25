import {Person} from './person.model';

export interface User {
  id?: number;
  username: string;
  password: string;
  role: string;
  person: Person;
}
