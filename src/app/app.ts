import { Component } from '@angular/core';
import { StudentList } from './components/student-list/student-list';
import { ProductList } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [StudentList, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
