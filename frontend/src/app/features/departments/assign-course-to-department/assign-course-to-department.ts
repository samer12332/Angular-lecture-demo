import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ICourse } from '../../../models/icourse';
import { IDepartment } from '../../../models/idepartment';
import { CourseService } from '../../../services/course';
import { DepartmentService } from '../../../services/department';

@Component({
  selector: 'app-assign-course-to-department',
  imports: [FormsModule, RouterLink],
  templateUrl: './assign-course-to-department.html',
  styleUrl: './assign-course-to-department.css',
})
export class AssignCourseToDepartment implements OnInit {
  departments = signal<IDepartment[]>([]);
  courses = signal<ICourse[]>([]);
  selectedDepartmentId = signal('');
  selectedCourseId = signal('');
  isLoading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor(
    private departmentService: DepartmentService,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    forkJoin({
      departments: this.departmentService.getAllDepartments(1, 1000),
      courses: this.courseService.getAllCourses(1, 1000),
    }).subscribe({
      next: ({ departments, courses }) => {
        this.departments.set(departments.data);
        this.courses.set(courses.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading assignment data:', error);
        this.errorMessage.set(
          this.getErrorMessage(
            error,
            'Could not load departments and courses. Make sure the backend server is running.',
          ),
        );
        this.isLoading.set(false);
      },
    });
  }

  assignCourse(): void {
    if (!this.selectedDepartmentId()) {
      this.successMessage.set('');
      this.errorMessage.set('Please select a department.');
      return;
    }

    if (!this.selectedCourseId()) {
      this.successMessage.set('');
      this.errorMessage.set('Please select a course.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.departmentService
      .assignCourseToDepartment(
        this.selectedDepartmentId(),
        this.selectedCourseId(),
      )
      .subscribe({
        next: () => {
          this.successMessage.set('Course assigned to department successfully.');
          this.errorMessage.set('');
          this.selectedCourseId.set('');
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error assigning course to department:', error);
          this.successMessage.set('');
          this.errorMessage.set(
            this.getErrorMessage(
              error,
              'Could not assign the selected course to the department.',
            ),
          );
          this.isLoading.set(false);
        },
      });
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

    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof error.message === 'string' &&
      error.message.trim()
    ) {
      return error.message;
    }

    return fallbackMessage;
  }
}
