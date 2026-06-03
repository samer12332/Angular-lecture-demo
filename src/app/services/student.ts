import { Injectable } from '@angular/core';
import { IStudent } from '../models/istudent';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: IStudent[] = [
    { id: 1, name: 'Ahmed Ali', age: 20 },
    { id: 2, name: 'Mona Hassan', age: 22 },
    { id: 3, name: 'Omar Khaled', age: 21 },
  ];

  getStudents(): IStudent[] {
    return this.students;
  }

  addStudent(newStudent: IStudent): void {
    this.students.push(newStudent);
  }

  updateStudent(updatedStudent: IStudent): void {
    const index = this.students.findIndex((student) => student.id === updatedStudent.id);

    if (index !== -1) {
      this.students[index] = updatedStudent;
    }
  }
}
