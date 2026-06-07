import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { DepartmentService } from '../../../services/department';

@Component({
  selector: 'app-department-add',
  imports: [FormsModule, RouterLink],
  templateUrl: './department-add.html',
  styleUrl: './department-add.css',
})
export class DepartmentAdd {
  departmentName = '';
  departmentDescription = '';
  errorMessage = signal('');

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
  ) {}

  addDepartment(): void {
    if (!this.departmentName.trim()) {
      this.errorMessage.set('Department name is required.');
      return;
    }

    this.errorMessage.set('');

    const newDepartment = {
      name: this.departmentName.trim(),
      description: this.departmentDescription.trim() || undefined,
    };

    this.departmentService.addDepartment(newDepartment).subscribe({
      next: () => {
        this.router.navigate(['/departments']);
      },
      error: (error) => {
        console.error('Error adding department:', error);
        this.errorMessage.set('Could not add the department.');
      },
    });
  }
}
