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

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.departmentService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments.set(departments);
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
}
