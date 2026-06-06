import { Routes } from '@angular/router';

import { StudentList } from './student-list/student-list';
import { StudentAdd } from './student-add/student-add';
import { StudentDetails } from './student-details/student-details';
import { StudentUpdate } from './student-update/student-update';
import { StudentDelete } from './student-delete/student-delete';

export const studentRoutes: Routes = [
  {
    path: '',
    component: StudentList,
  },
  {
    path: 'add',
    component: StudentAdd,
  },
  {
    path: 'details/:id',
    component: StudentDetails,
  },
  {
    path: 'update/:id',
    component: StudentUpdate,
  },
  {
    path: 'delete/:id',
    component: StudentDelete,
  },
];
