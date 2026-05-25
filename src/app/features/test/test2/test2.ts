import { encapsulateStyle } from '@angular/compiler';
import { Component, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-test2',
  imports: [],
  templateUrl: './test2.html',
  styleUrl: './test2.css',
  // encapsulation: ViewEncapsulation.None,
})
export class Test2 {}
