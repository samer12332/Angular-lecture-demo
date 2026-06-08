import { ICourse } from './icourse';
import { IStudent } from './istudent';

export interface IDegree {
  _id: string;
  student: string | IStudent;
  course: string | ICourse;
  degree: number;
}
