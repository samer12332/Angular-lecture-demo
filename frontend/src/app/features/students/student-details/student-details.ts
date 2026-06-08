import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { IDegree } from '../../../models/idegree';
import { IStudent } from '../../../models/istudent';
import { DegreeService } from '../../../services/degree';
import { StudentService } from '../../../services/student';

@Component({
  selector: 'app-student-details',
  imports: [RouterLink],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails implements OnInit {
  student = signal<IStudent | null>(null);
  studentDegrees = signal<IDegree[]>([]);
  isLoading = signal(true);
  degreesLoading = signal(false);
  errorMessage = signal('');
  degreesErrorMessage = signal('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private degreeService: DegreeService,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.isLoading.set(false);
      this.errorMessage.set('Invalid student id.');
      return;
    }

    this.loadStudentDegrees(id);

    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.student.set(student);
        this.isLoading.set(false);
        this.errorMessage.set('');
      },
      error: (error) => {
        console.error('Error loading student details:', error);
        this.student.set(null);
        this.isLoading.set(false);
        this.errorMessage.set('Student not found.');
      },
    });
  }

  getCourseName(degree: IDegree): string {
    if (typeof degree.course === 'string') {
      return 'Unknown';
    }

    return degree.course.name;
  }

  getCourseCode(degree: IDegree): string {
    if (typeof degree.course === 'string') {
      return 'Unknown';
    }

    return degree.course.code;
  }

  getDegreeLabel(degreeValue: number): string {
    if (degreeValue >= 85) {
      return 'Excellent';
    }

    if (degreeValue >= 65) {
      return 'Good';
    }

    return 'Needs Improvement';
  }

  getDegreeBadgeClass(degreeValue: number): string {
    if (degreeValue >= 85) {
      return 'bg-success';
    }

    if (degreeValue >= 65) {
      return 'bg-primary';
    }

    return 'bg-warning text-dark';
  }

  private loadStudentDegrees(studentId: string): void {
    this.degreesLoading.set(true);
    this.degreesErrorMessage.set('');

    this.degreeService.getDegreesByStudent(studentId).subscribe({
      next: (degrees) => {
        this.studentDegrees.set(degrees);
        this.degreesLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading student degrees:', error);
        this.studentDegrees.set([]);
        this.degreesLoading.set(false);
        this.degreesErrorMessage.set('Could not load degrees for this student.');
      },
    });
  }
}
