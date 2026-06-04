import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { IStudent } from '../../../models/istudent';
import { StudentService } from '../../../services/student';

@Component({
  selector: 'app-student-details',
  imports: [RouterLink],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails implements OnInit {
  student = signal<IStudent | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.isLoading.set(false);
      this.errorMessage.set('Invalid student id.');
      return;
    }

    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.student.set(student);
        this.isLoading.set(false);
        this.errorMessage.set('');
      },
      error: (error) => {
        console.error('Error loading student details:', error);
        this.student.set(null);
        this.isLoading.set(false);
        this.errorMessage.set('Student not found.');
      },
    });
  }
}
