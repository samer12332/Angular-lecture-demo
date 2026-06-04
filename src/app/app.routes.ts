import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  {
    path: 'students',
    loadChildren: () => import('./features/students/student.routes').then((m) => m.studentRoutes),
  },
  { path: '**', redirectTo: 'home' },
];
