import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDepartment } from '../models/idepartment';
import { IPaginatedResponse } from '../models/ipaginated-response';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl = 'http://localhost:3000/departments';

  constructor(private http: HttpClient) {}

  getAllDepartments(
    page = 1,
    limit = 10,
  ): Observable<IPaginatedResponse<IDepartment>> {
    return this.http.get<IPaginatedResponse<IDepartment>>(
      `${this.apiUrl}?page=${page}&limit=${limit}`,
    );
  }

  getDepartmentById(id: string): Observable<IDepartment> {
    return this.http.get<IDepartment>(`${this.apiUrl}/${id}`);
  }

  addDepartment(
    department: Omit<IDepartment, '_id'>,
  ): Observable<IDepartment> {
    return this.http.post<IDepartment>(this.apiUrl, department);
  }

  updateDepartment(
    id: string,
    department: Partial<Omit<IDepartment, '_id'>>,
  ): Observable<IDepartment> {
    return this.http.put<IDepartment>(`${this.apiUrl}/${id}`, department);
  }

  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignCourseToDepartment(
    departmentId: string,
    courseId: string,
  ): Observable<IDepartment> {
    return this.http.post<IDepartment>(
      `${this.apiUrl}/${departmentId}/courses/${courseId}`,
      {},
    );
  }

  removeCourseFromDepartment(
    departmentId: string,
    courseId: string,
  ): Observable<IDepartment> {
    return this.http.delete<IDepartment>(
      `${this.apiUrl}/${departmentId}/courses/${courseId}`,
    );
  }
}
