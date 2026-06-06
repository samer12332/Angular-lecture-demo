import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { IStudent } from '../../../models/istudent';
import { StudentService } from '../../../services/student';

@Component({
  selector: 'app-student-update',
  imports: [FormsModule, RouterLink],
  templateUrl: './student-update.html',
  styleUrl: './student-update.css',
})
export class StudentUpdate implements OnInit {
  student = signal<IStudent | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/students']);
      return;
    }

    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.student.set(student);
        this.isLoading.set(false);
        this.errorMessage.set('');
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.student.set(null);
        this.isLoading.set(false);
        this.errorMessage.set('Student not found.');
      },
    });
  }

  updateStudent(): void {
    const currentStudent = this.student();

    if (!currentStudent) {
      return;
    }

    this.studentService.updateStudent(currentStudent).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Error updating student:', error);
        this.errorMessage.set('Could not update the student.');
      },
    });
  }

  updateStudentName(name: string): void {
    this.student.update((student) => (student ? { ...student, name } : student));
  }

  updateStudentAge(age: string | number): void {
    const parsedAge = Number(age);
    this.student.update((student) =>
      student
        ? {
            ...student,
            age: Number.isNaN(parsedAge) ? student.age : parsedAge,
          }
        : student,
    );
  }
}
