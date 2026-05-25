import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test1 } from './features/test/test1/test1';
import { Test2 } from './features/test/test2/test2';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Test1],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // protected readonly title = signal('demo5');
  id = 10;
  name = 'aly';
  age = 21;
}
