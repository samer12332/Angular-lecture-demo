import { Component } from '@angular/core';
import { Test1 } from './features/test/test1/test1';
import { Test2 } from './features/test/test2/test2';
import { Productlist } from './features/products/productlist/productlist';

@Component({
  selector: 'app-root',
  // RouterOutlet
  imports: [Test1, Test2, Productlist],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  id = 10;
  name = 'aly';
  age = 21;
}
