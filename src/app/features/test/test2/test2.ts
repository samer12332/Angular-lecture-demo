import { Component } from '@angular/core';
import { Student } from '../../../models/student';
import { IStudent } from '../../../models/istudent';
import { FormsModule } from '@angular/forms';
// import { Test3 } from '../test3/test3';

@Component({
  selector: 'app-test2',
  imports: [FormsModule],
  templateUrl: './test2.html',
  styleUrl: './test2.css',
})
export class Test2 {
  std: IStudent = { id: 5, name: 'aly', age: 30 };
}
