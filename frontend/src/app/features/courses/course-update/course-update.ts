import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ICourse } from '../../../models/icourse';
import { CourseService } from '../../../services/course';

@Component({
  selector: 'app-course-update',
  imports: [FormsModule, RouterLink],
  templateUrl: './course-update.html',
  styleUrl: './course-update.css',
})
export class CourseUpdate implements OnInit {
  course = signal<ICourse | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/courses']);
      return;
    }

    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        this.course.set(course);
        this.isLoading.set(false);
        this.errorMessage.set('');
      },
      error: (error) => {
        console.error('Error loading course:', error);
        this.course.set(null);
        this.isLoading.set(false);
        this.errorMessage.set('Course not found.');
      },
    });
  }

  updateCourse(): void {
    const currentCourse = this.course();
    const validationMessage = this.getValidationMessage(currentCourse);

    if (!currentCourse || validationMessage) {
      if (validationMessage) {
        this.errorMessage.set(validationMessage);
      }
      return;
    }

    this.courseService
      .updateCourse(currentCourse._id, {
        name: currentCourse.name.trim(),
        code: currentCourse.code.trim(),
        hours: Number(currentCourse.hours),
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          console.error('Error updating course:', error);
          this.errorMessage.set('Could not update the course.');
        },
      });
  }

  updateCourseName(name: string): void {
    this.course.update((course) => (course ? { ...course, name } : course));
  }

  updateCourseCode(code: string): void {
    this.course.update((course) => (course ? { ...course, code } : course));
  }

  updateCourseHours(hours: string | number): void {
    const parsedHours = Number(hours);
    this.course.update((course) =>
      course
        ? {
            ...course,
            hours: Number.isNaN(parsedHours) ? course.hours : parsedHours,
          }
        : course,
    );
  }

  private getValidationMessage(course: ICourse | null): string {
    if (!course) {
      return '';
    }

    if (!course.name.trim()) {
      return 'Course name is required.';
    }

    if (!course.code.trim()) {
      return 'Course code is required.';
    }

    if (Number(course.hours) <= 0) {
      return 'Course hours must be greater than 0.';
    }

    return '';
  }
}
