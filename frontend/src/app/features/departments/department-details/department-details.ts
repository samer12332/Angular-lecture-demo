import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { IDepartment } from '../../../models/idepartment';
import { DepartmentService } from '../../../services/department';

@Component({
  selector: 'app-department-details',
  imports: [RouterLink],
  templateUrl: './department-details.html',
  styleUrl: './department-details.css',
})
export class DepartmentDetails implements OnInit {
  department = signal<IDepartment | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.isLoading.set(false);
      this.errorMessage.set('Invalid department id.');
      return;
    }

    this.departmentService.getDepartmentById(id).subscribe({
      next: (department) => {
        this.department.set(department);
        this.isLoading.set(false);
        this.errorMessage.set('');
      },
      error: (error) => {
        console.error('Error loading department details:', error);
        this.department.set(null);
        this.isLoading.set(false);
        this.errorMessage.set('Department not found.');
      },
    });
  }
}
