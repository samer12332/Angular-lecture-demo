import { Component } from '@angular/core';
import { IStudent } from '../../models/istudent';

import { StudentAdd } from '../student-add/student-add';
import { StudentDetails } from '../student-details/student-details';
import { StudentEdit } from '../student-edit/student-edit';

@Component({
  selector: 'app-student-list',
  imports: [StudentAdd, StudentDetails, StudentEdit],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  students: IStudent[] = [
    { id: 1, name: 'Ahmed Ali', age: 20 },
    { id: 2, name: 'Mona Hassan', age: 22 },
    { id: 3, name: 'Omar Khaled', age: 21 },
  ];

  selectedStudent: IStudent | null = null;
  studentToEdit: IStudent | null = null;

  addStudent(newStudent: IStudent): void {
    this.students.push(newStudent);
  }

  showDetails(student: IStudent): void {
    this.selectedStudent = student;
  }

  editStudent(student: IStudent): void {
    this.studentToEdit = { ...student };
  }

  updateStudent(updatedStudent: IStudent): void {
    const index = this.students.findIndex((student) => student.id === updatedStudent.id);

    if (index !== -1) {
      this.students[index] = updatedStudent;
    }

    this.studentToEdit = null;
  }
}
