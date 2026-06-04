import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { StudentService } from '../../../services/student';

@Component({
  selector: 'app-student-add',
  imports: [FormsModule, RouterLink],
  templateUrl: './student-add.html',
  styleUrl: './student-add.css',
})
export class StudentAdd {
  studentName: string = '';
  studentAge: number | null = null;

  constructor(
    private studentService: StudentService,
    private router: Router,
  ) {}

  addStudent(): void {
    if (!this.studentName || !this.studentAge || this.studentAge <= 0) {
      return;
    }

    const newStudent = {
      name: this.studentName,
      age: this.studentAge,
    };

    this.studentService.addStudent(newStudent).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Error adding student:', error);
      },
    });
  }
}
