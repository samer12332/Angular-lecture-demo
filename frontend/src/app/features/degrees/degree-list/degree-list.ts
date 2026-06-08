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

  constructor(private degreeService: DegreeService) {}

  ngOnInit(): void {
    this.loadDegrees();
  }

  loadDegrees(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.degreeService.getAllDegrees().subscribe({
      next: (degrees) => {
        this.degrees.set(degrees);
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
