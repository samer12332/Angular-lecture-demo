import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IDegree } from '../../../models/idegree';
import { ICourse } from '../../../models/icourse';
import { IStudent } from '../../../models/istudent';
import { DegreeService } from '../../../services/degree';

@Component({
  selector: 'app-degree-list',
  imports: [RouterLink],
  templateUrl: './degree-list.html',
  styleUrl: './degree-list.css',
})
export class DegreeList implements OnInit {
  degrees = signal<IDegree[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  currentPage = signal(1);
  limit = signal(10);
  totalPages = signal(1);
  totalItems = signal(0);
  hasNextPage = signal(false);
  hasPrevPage = signal(false);

  constructor(private degreeService: DegreeService) {}

  ngOnInit(): void {
    this.loadDegrees(1);
  }

  loadDegrees(page: number): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.degreeService.getAllDegrees(page, this.limit()).subscribe({
      next: (response) => {
        this.degrees.set(response.data);
        this.currentPage.set(response.pagination.currentPage);
        this.totalPages.set(response.pagination.totalPages);
        this.totalItems.set(response.pagination.totalItems);
        this.hasNextPage.set(response.pagination.hasNextPage);
        this.hasPrevPage.set(response.pagination.hasPrevPage);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading degrees:', error);
        this.errorMessage.set(
          'Could not load degrees from the database. Make sure the backend server is running.',
        );
        this.isLoading.set(false);
      },
    });
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.loadDegrees(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.hasPrevPage()) {
      this.loadDegrees(this.currentPage() - 1);
    }
  }

  changeLimit(value: string): void {
    this.limit.set(Number(value));
    this.loadDegrees(1);
  }

  onLimitChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;

    if (!target) {
      return;
    }

    this.changeLimit(target.value);
  }

  getStudentName(degree: IDegree): string {
    if (typeof degree.student === 'string') {
      return degree.student;
    }

    return (degree.student as IStudent).name;
  }

  getCourseName(degree: IDegree): string {
    if (typeof degree.course === 'string') {
      return degree.course;
    }

    return (degree.course as ICourse).name;
  }
}
