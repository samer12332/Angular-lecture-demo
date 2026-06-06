import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { IStudent } from '../../../models/istudent';
import { StudentService } from '../../../services/student';

@Component({
  selector: 'app-student-delete',
  imports: [RouterLink],
  templateUrl: './student-delete.html',
  styleUrl: './student-delete.css',
})
export class StudentDelete implements OnInit {
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

  confirmDelete(): void {
    const currentStudent = this.student();

    if (!currentStudent) {
      return;
    }

    this.studentService.deleteStudent(currentStudent.id).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Error deleting student:', error);
        this.errorMessage.set('Could not delete the student.');
      },
    });
  }
}
