import { Routes } from '@angular/router';

import { DegreeAdd } from './degree-add/degree-add';
import { DegreeDelete } from './degree-delete/degree-delete';
import { DegreeList } from './degree-list/degree-list';
import { DegreeUpdate } from './degree-update/degree-update';

export const degreeRoutes: Routes = [
  {
    path: '',
    component: DegreeList,
  },
  {
    path: 'add',
    component: DegreeAdd,
  },
  {
    path: 'update/:id',
    component: DegreeUpdate,
  },
  {
    path: 'delete/:id',
    component: DegreeDelete,
  },
];
