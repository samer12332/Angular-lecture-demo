import { Component } from '@angular/core';
import { IStudent } from '../../models/istudent';

import { StudentService } from '../../services/student';

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
  students: IStudent[] = [];

  selectedStudent: IStudent | null = null;
  studentToEdit: IStudent | null = null;

  constructor(private studentService: StudentService) {
    this.students = this.studentService.getStudents();
  }

  addStudent(newStudent: IStudent): void {
    this.studentService.addStudent(newStudent);
    this.students = this.studentService.getStudents();
  }

  showDetails(student: IStudent): void {
    this.selectedStudent = student;
  }

  editStudent(student: IStudent): void {
    this.studentToEdit = { ...student };
  }

  updateStudent(updatedStudent: IStudent): void {
    this.studentService.updateStudent(updatedStudent);
    this.students = this.studentService.getStudents();

    this.studentToEdit = null;
  }
}
