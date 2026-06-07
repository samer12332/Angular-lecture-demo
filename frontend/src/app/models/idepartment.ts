import { ICourse } from './icourse';

export interface IDepartment {
  _id: string;
  name: string;
  description?: string;
  courses?: ICourse[];
}
