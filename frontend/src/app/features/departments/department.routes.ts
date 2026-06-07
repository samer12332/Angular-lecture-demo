import { Routes } from '@angular/router';

import { DepartmentAdd } from './department-add/department-add';
import { DepartmentDelete } from './department-delete/department-delete';
import { DepartmentDetails } from './department-details/department-details';
import { DepartmentList } from './department-list/department-list';
import { DepartmentUpdate } from './department-update/department-update';

export const departmentRoutes: Routes = [
  {
    path: '',
    component: DepartmentList,
  },
  {
    path: 'add',
    component: DepartmentAdd,
  },
  {
    path: 'details/:id',
    component: DepartmentDetails,
  },
  {
    path: 'update/:id',
    component: DepartmentUpdate,
  },
  {
    path: 'delete/:id',
    component: DepartmentDelete,
  },
];
