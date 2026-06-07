import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ICourse } from '../../../models/icourse';
import { CourseService } from '../../../services/course';

@Component({
  selector: 'app-course-delete',
  imports: [RouterLink],
  templateUrl: './course-delete.html',
  styleUrl: './course-delete.css',
})
export class CourseDelete implements OnInit {
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

  confirmDelete(): void {
    const currentCourse = this.course();

    if (!currentCourse) {
      return;
    }

    this.courseService.deleteCourse(currentCourse._id).subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: (error) => {
        console.error('Error deleting course:', error);
        this.errorMessage.set('Could not delete the course.');
      },
    });
  }
}
