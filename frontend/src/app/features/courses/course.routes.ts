import { Routes } from '@angular/router';

import { CourseAdd } from './course-add/course-add';
import { CourseDelete } from './course-delete/course-delete';
import { CourseDetails } from './course-details/course-details';
import { CourseList } from './course-list/course-list';
import { CourseUpdate } from './course-update/course-update';

export const courseRoutes: Routes = [
  {
    path: '',
    component: CourseList,
  },
  {
    path: 'add',
    component: CourseAdd,
  },
  {
    path: 'details/:id',
    component: CourseDetails,
  },
  {
    path: 'update/:id',
    component: CourseUpdate,
  },
  {
    path: 'delete/:id',
    component: CourseDelete,
  },
];
