import { Component } from '@angular/core';
import { IStudent } from '../../models/istudent';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  students: IStudent[] = [
    { id: 1, name: 'Ahmed Ali', age: 20 },
    { id: 2, name: 'Mona Hassan', age: 22 },
    { id: 3, name: 'Omar Khaled', age: 21 },
    { id: 4, name: 'Sara Mohamed', age: 19 },
  ];
}
