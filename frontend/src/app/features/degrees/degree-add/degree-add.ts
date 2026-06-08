import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ICourse } from '../../../models/icourse';
import { IStudent } from '../../../models/istudent';
import { CourseService } from '../../../services/course';
import { DegreeService } from '../../../services/degree';
import { StudentService } from '../../../services/student';

@Component({
  selector: 'app-degree-add',
  imports: [FormsModule, RouterLink],
  templateUrl: './degree-add.html',
  styleUrl: './degree-add.css',
})
export class DegreeAdd implements OnInit {
  students = signal<IStudent[]>([]);
  courses = signal<ICourse[]>([]);
  selectedStudentId = signal('');
  selectedCourseId = signal('');
  degreeValue = signal<number | null>(null);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private degreeService: DegreeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    forkJoin({
      students: this.studentService.getAllStudents(),
      courses: this.courseService.getAllCourses(),
    }).subscribe({
      next: ({ students, courses }) => {
        this.students.set(students);
        this.courses.set(courses);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading degree form data:', error);
        this.errorMessage.set(
          'Could not load students and courses. Make sure the backend server is running.',
        );
        this.isLoading.set(false);
      },
    });
  }

  addDegree(): void {
    const validationMessage = this.getValidationMessage();

    if (validationMessage) {
      this.errorMessage.set(validationMessage);
      return;
    }

    this.errorMessage.set('');

    this.degreeService
      .addDegree({
        student: this.selectedStudentId(),
        course: this.selectedCourseId(),
        degree: Number(this.degreeValue()),
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/degrees']);
        },
        error: (error) => {
          console.error('Error adding degree:', error);
          this.errorMessage.set(
            this.getErrorMessage(error, 'Could not add the degree.'),
          );
        },
      });
  }

  setDegreeValue(value: string | number | null): void {
    if (value === null || value === '') {
      this.degreeValue.set(null);
      return;
    }

    const parsedValue = Number(value);
    this.degreeValue.set(Number.isNaN(parsedValue) ? null : parsedValue);
  }

  private getValidationMessage(): string {
    if (!this.selectedStudentId()) {
      return 'Student is required.';
    }

    if (!this.selectedCourseId()) {
      return 'Course is required.';
    }

    if (this.degreeValue() === null || Number.isNaN(Number(this.degreeValue()))) {
      return 'Degree is required.';
    }

    if (Number(this.degreeValue()) < 0 || Number(this.degreeValue()) > 100) {
      return 'Degree must be between 0 and 100.';
    }

    return '';
  }

  private getErrorMessage(error: unknown, fallbackMessage: string): string {
    if (
      typeof error === 'object' &&
      error !== null &&
      'error' in error &&
      typeof error.error === 'object' &&
      error.error !== null &&
      'message' in error.error &&
      typeof error.error.message === 'string' &&
      error.error.message.trim()
    ) {
      return error.error.message;
    }

    return fallbackMessage;
  }
}
