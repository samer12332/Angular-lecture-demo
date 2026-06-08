import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { IDegree } from '../../../models/idegree';
import { DegreeService } from '../../../services/degree';

@Component({
  selector: 'app-degree-update',
  imports: [FormsModule, RouterLink],
  templateUrl: './degree-update.html',
  styleUrl: './degree-update.css',
})
export class DegreeUpdate implements OnInit {
  degree = signal<IDegree | null>(null);
  degreeValue = signal<number | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private degreeService: DegreeService,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/degrees']);
      return;
    }

    this.degreeService.getDegreeById(id).subscribe({
      next: (degree) => {
        this.degree.set(degree);
        this.degreeValue.set(degree.degree);
        this.isLoading.set(false);
        this.errorMessage.set('');
      },
      error: (error) => {
        console.error('Error loading degree:', error);
        this.degree.set(null);
        this.degreeValue.set(null);
        this.isLoading.set(false);
        this.errorMessage.set('Degree not found.');
      },
    });
  }

  updateDegree(): void {
    const currentDegree = this.degree();
    const degreeValue = this.degreeValue();
    const validationMessage = this.getValidationMessage();

    if (!currentDegree || validationMessage) {
      if (validationMessage) {
        this.errorMessage.set(validationMessage);
      }
      return;
    }

    this.degreeService
      .updateDegree(currentDegree._id, { degree: Number(degreeValue) })
      .subscribe({
        next: () => {
          this.router.navigate(['/degrees']);
        },
        error: (error) => {
          console.error('Error updating degree:', error);
          this.errorMessage.set(
            this.getErrorMessage(error, 'Could not update the degree.'),
          );
        },
      });
  }

  setDegreeValue(value: string | number | null): void {
    if (value === null || value === '') {
      this.degreeValue.set(null);
      return;
    }

    const parsedValue = Number(value);
    this.degreeValue.set(Number.isNaN(parsedValue) ? null : parsedValue);
  }

  getStudentName(): string {
    const currentDegree = this.degree();

    if (!currentDegree) {
      return '';
    }

    return typeof currentDegree.student === 'string'
      ? currentDegree.student
      : currentDegree.student.name;
  }

  getCourseName(): string {
    const currentDegree = this.degree();

    if (!currentDegree) {
      return '';
    }

    return typeof currentDegree.course === 'string'
      ? currentDegree.course
      : currentDegree.course.name;
  }

  private getValidationMessage(): string {
    if (this.degreeValue() === null || Number.isNaN(Number(this.degreeValue()))) {
      return 'Degree is required.';
    }

    if (Number(this.degreeValue()) < 0 || Number(this.degreeValue()) > 100) {
      return 'Degree must be between 0 and 100.';
    }

    return '';
  }

  private getErrorMessage(error: unknown, fallbackMessage: string): string {
    if (
      typeof error === 'object' &&
      error !== null &&
      'error' in error &&
      typeof error.error === 'object' &&
      error.error !== null &&
      'message' in error.error &&
      typeof error.error.message === 'string' &&
      error.error.message.trim()
    ) {
      return error.error.message;
    }

    return fallbackMessage;
  }
}
