import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IDepartment } from '../../../models/idepartment';
import { DepartmentService } from '../../../services/department';

@Component({
  selector: 'app-department-list',
  imports: [RouterLink],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css',
})
export class DepartmentList implements OnInit {
  departments = signal<IDepartment[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');
  currentPage = signal(1);
  limit = signal(10);
  totalPages = signal(1);
  totalItems = signal(0);
  hasNextPage = signal(false);
  hasPrevPage = signal(false);

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments(1);
  }

  loadDepartments(page: number): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.departmentService.getAllDepartments(page, this.limit()).subscribe({
      next: (response) => {
        this.departments.set(response.data);
        this.currentPage.set(response.pagination.currentPage);
        this.totalPages.set(response.pagination.totalPages);
        this.totalItems.set(response.pagination.totalItems);
        this.hasNextPage.set(response.pagination.hasNextPage);
        this.hasPrevPage.set(response.pagination.hasPrevPage);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading departments:', error);
        this.errorMessage.set(
          'Could not load departments from the database. Make sure the backend server is running.',
        );
        this.isLoading.set(false);
      },
    });
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.loadDepartments(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.hasPrevPage()) {
      this.loadDepartments(this.currentPage() - 1);
    }
  }

  changeLimit(value: string): void {
    this.limit.set(Number(value));
    this.loadDepartments(1);
  }

  onLimitChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;

    if (!target) {
      return;
    }

    this.changeLimit(target.value);
  }
}
