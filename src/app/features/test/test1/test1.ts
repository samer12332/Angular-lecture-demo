import { Component } from '@angular/core';
import { Test2 } from '../test2/test2';

@Component({
  selector: 'app-test1',
  imports: [Test2],
  templateUrl: './test1.html',
  styleUrl: './test1.css',
})
export class Test1 {}
