import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { IDepartment } from '../../../models/idepartment';
import { DepartmentService } from '../../../services/department';

@Component({
  selector: 'app-department-delete',
  imports: [RouterLink],
  templateUrl: './department-delete.html',
  styleUrl: './department-delete.css',
})
export class DepartmentDelete implements OnInit {
  department = signal<IDepartment | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/departments']);
      return;
    }

    this.departmentService.getDepartmentById(id).subscribe({
      next: (department) => {
        this.department.set(department);
        this.isLoading.set(false);
        this.errorMessage.set('');
      },
      error: (error) => {
        console.error('Error loading department:', error);
        this.department.set(null);
        this.isLoading.set(false);
        this.errorMessage.set('Department not found.');
      },
    });
  }

  confirmDelete(): void {
    const currentDepartment = this.department();

    if (!currentDepartment) {
      return;
    }

    this.departmentService.deleteDepartment(currentDepartment._id).subscribe({
      next: () => {
        this.router.navigate(['/departments']);
      },
      error: (error) => {
        console.error('Error deleting department:', error);
        this.errorMessage.set('Could not delete the department.');
      },
    });
  }
}
