import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IStudent } from '../../models/istudent';

@Component({
  selector: 'app-student-add',
  imports: [FormsModule],
  templateUrl: './student-add.html',
  styleUrl: './student-add.css',
})
export class StudentAdd {
  @Output() studentAdded = new EventEmitter<IStudent>();

  studentName: string = '';
  studentAge: number = 0;

  addStudent(): void {
    if (!this.studentName || this.studentAge <= 0) {
      return;
    }

    const newStudent: IStudent = {
      id: Date.now(),
      name: this.studentName,
      age: this.studentAge,
    };

    this.studentAdded.emit(newStudent);

    this.studentName = '';
    this.studentAge = 0;
  }
}
