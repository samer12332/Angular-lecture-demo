import { Component, Input } from '@angular/core';
import { IStudent } from '../../models/istudent';

@Component({
  selector: 'app-student-details',
  imports: [],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails {
  @Input() student: IStudent | null = null;
}
