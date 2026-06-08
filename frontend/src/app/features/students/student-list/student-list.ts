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
  currentPage = signal(1);
  limit = signal(10);
  totalPages = signal(1);
  totalItems = signal(0);
  hasNextPage = signal(false);
  hasPrevPage = signal(false);

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents(1);
  }

  loadStudents(page: number): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.studentService.getAllStudents(page, this.limit()).subscribe({
      next: (response) => {
        this.students.set(response.data);
        this.currentPage.set(response.pagination.currentPage);
        this.totalPages.set(response.pagination.totalPages);
        this.totalItems.set(response.pagination.totalItems);
        this.hasNextPage.set(response.pagination.hasNextPage);
        this.hasPrevPage.set(response.pagination.hasPrevPage);
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

  nextPage(): void {
    if (this.hasNextPage()) {
      this.loadStudents(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.hasPrevPage()) {
      this.loadStudents(this.currentPage() - 1);
    }
  }

  changeLimit(value: string): void {
    this.limit.set(Number(value));
    this.loadStudents(1);
  }

  onLimitChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;

    if (!target) {
      return;
    }

    this.changeLimit(target.value);
  }
}
