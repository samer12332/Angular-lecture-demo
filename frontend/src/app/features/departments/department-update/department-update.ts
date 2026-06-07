import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { IDepartment } from '../../../models/idepartment';
import { DepartmentService } from '../../../services/department';

@Component({
  selector: 'app-department-update',
  imports: [FormsModule, RouterLink],
  templateUrl: './department-update.html',
  styleUrl: './department-update.css',
})
export class DepartmentUpdate implements OnInit {
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

  updateDepartment(): void {
    const currentDepartment = this.department();

    if (!currentDepartment) {
      return;
    }

    if (!currentDepartment.name.trim()) {
      this.errorMessage.set('Department name is required.');
      return;
    }

    this.departmentService
      .updateDepartment(currentDepartment._id, {
        name: currentDepartment.name.trim(),
        description: currentDepartment.description?.trim() || undefined,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/departments']);
        },
        error: (error) => {
          console.error('Error updating department:', error);
          this.errorMessage.set('Could not update the department.');
        },
      });
  }

  updateDepartmentName(name: string): void {
    this.department.update((department) =>
      department ? { ...department, name } : department,
    );
  }

  updateDepartmentDescription(description: string): void {
    this.department.update((department) =>
      department ? { ...department, description } : department,
    );
  }
}
