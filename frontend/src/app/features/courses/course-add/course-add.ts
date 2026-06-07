import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CourseService } from '../../../services/course';

@Component({
  selector: 'app-course-add',
  imports: [FormsModule, RouterLink],
  templateUrl: './course-add.html',
  styleUrl: './course-add.css',
})
export class CourseAdd {
  courseName = '';
  courseCode = '';
  courseHours: number | null = null;
  errorMessage = signal('');

  constructor(
    private courseService: CourseService,
    private router: Router,
  ) {}

  addCourse(): void {
    const validationMessage = this.getValidationMessage();

    if (validationMessage) {
      this.errorMessage.set(validationMessage);
      return;
    }

    this.errorMessage.set('');

    const newCourse = {
      name: this.courseName.trim(),
      code: this.courseCode.trim(),
      hours: Number(this.courseHours),
    };

    this.courseService.addCourse(newCourse).subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: (error) => {
        console.error('Error adding course:', error);
        this.errorMessage.set('Could not add the course.');
      },
    });
  }

  private getValidationMessage(): string {
    if (!this.courseName.trim()) {
      return 'Course name is required.';
    }

    if (!this.courseCode.trim()) {
      return 'Course code is required.';
    }

    if (this.courseHours === null || this.courseHours <= 0) {
      return 'Course hours must be greater than 0.';
    }

    return '';
  }
}
