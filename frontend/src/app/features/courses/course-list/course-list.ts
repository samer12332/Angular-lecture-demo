import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ICourse } from '../../../models/icourse';
import { CourseService } from '../../../services/course';

@Component({
  selector: 'app-course-list',
  imports: [RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses = signal<ICourse[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses.set(courses);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.errorMessage.set(
          'Could not load courses from the database. Make sure the backend server is running.',
        );
        this.isLoading.set(false);
      },
    });
  }
}
