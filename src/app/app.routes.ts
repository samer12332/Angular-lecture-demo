import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

import { StudentList } from './components/student-list/student-list';
import { ProductList } from './components/product-list/product-list';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'students', component: StudentList },
  { path: 'products', component: ProductList },
  { path: '**', redirectTo: 'home' },
];
