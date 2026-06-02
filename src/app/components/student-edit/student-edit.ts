import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IStudent } from '../../models/istudent';

@Component({
  selector: 'app-student-edit',
  imports: [FormsModule],
  templateUrl: './student-edit.html',
  styleUrl: './student-edit.css',
})
export class StudentEdit {
  @Input() student: IStudent | null = null;
  @Output() studentUpdated = new EventEmitter<IStudent>();

  updateStudent(): void {
    if (!this.student) {
      return;
    }

    this.studentUpdated.emit(this.student);
  }
}
