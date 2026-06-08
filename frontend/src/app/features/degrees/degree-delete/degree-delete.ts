import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { IDegree } from '../../../models/idegree';
import { DegreeService } from '../../../services/degree';

@Component({
  selector: 'app-degree-delete',
  imports: [RouterLink],
  templateUrl: './degree-delete.html',
  styleUrl: './degree-delete.css',
})
export class DegreeDelete implements OnInit {
  degree = signal<IDegree | null>(null);
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
        this.isLoading.set(false);
        this.errorMessage.set('');
      },
      error: (error) => {
        console.error('Error loading degree:', error);
        this.degree.set(null);
        this.isLoading.set(false);
        this.errorMessage.set('Degree not found.');
      },
    });
  }

  confirmDelete(): void {
    const currentDegree = this.degree();

    if (!currentDegree) {
      return;
    }

    this.degreeService.deleteDegree(currentDegree._id).subscribe({
      next: () => {
        this.router.navigate(['/degrees']);
      },
      error: (error) => {
        console.error('Error deleting degree:', error);
        this.errorMessage.set('Could not delete the degree.');
      },
    });
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
}
