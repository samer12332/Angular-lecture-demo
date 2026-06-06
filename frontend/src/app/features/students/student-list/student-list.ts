import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IStudent } from '../../../models/istudent';
import { StudentService } from '../../../services/student';

@Component({
  selector: 'app-student-list',
  imports: [RouterLink],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  students = signal<IStudent[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        this.students.set(students);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.errorMessage.set(
          'Could not load students from the database. Make sure the backend server is running.',
        );
        this.isLoading.set(false);
      },
    });
  }
}
