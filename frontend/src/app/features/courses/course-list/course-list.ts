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
  currentPage = signal(1);
  limit = signal(10);
  totalPages = signal(1);
  totalItems = signal(0);
  hasNextPage = signal(false);
  hasPrevPage = signal(false);

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses(1);
  }

  loadCourses(page: number): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.courseService.getAllCourses(page, this.limit()).subscribe({
      next: (response) => {
        this.courses.set(response.data);
        this.currentPage.set(response.pagination.currentPage);
        this.totalPages.set(response.pagination.totalPages);
        this.totalItems.set(response.pagination.totalItems);
        this.hasNextPage.set(response.pagination.hasNextPage);
        this.hasPrevPage.set(response.pagination.hasPrevPage);
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

  nextPage(): void {
    if (this.hasNextPage()) {
      this.loadCourses(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.hasPrevPage()) {
      this.loadCourses(this.currentPage() - 1);
    }
  }

  changeLimit(value: string): void {
    this.limit.set(Number(value));
    this.loadCourses(1);
  }

  onLimitChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;

    if (!target) {
      return;
    }

    this.changeLimit(target.value);
  }
}
