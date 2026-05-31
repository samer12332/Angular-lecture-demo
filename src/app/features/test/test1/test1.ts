import { Component, signal } from '@angular/core';
import { Test2 } from '../test2/test2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test1',
  imports: [FormsModule],
  templateUrl: './test1.html',
  styleUrl: './test1.css',
})
export class Test1 {
  x = 30;
  y = 2;
  z = 30;
  id = signal(10);
  name = signal('aly');
  age = signal(30);
  flag = true;
  updatey(val: any) {
    this.y = val;
    // console.log(val);
  }
  myfun(s: any) {
    console.log(s);
  }
  constructor() {
    // this.id.set(60);
    this.id.update((s) => s + 1);
  }
}
