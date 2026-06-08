import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPaginatedResponse } from '../models/ipaginated-response';
import { IStudent } from '../models/istudent';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getAllStudents(page = 1, limit = 10): Observable<IPaginatedResponse<IStudent>> {
    return this.http.get<IPaginatedResponse<IStudent>>(
      `${this.apiUrl}?page=${page}&limit=${limit}`,
    );
  }

  getStudentById(id: string): Observable<IStudent> {
    return this.http.get<IStudent>(`${this.apiUrl}/${id}`);
  }

  addStudent(student: Omit<IStudent, 'id'>): Observable<IStudent> {
    return this.http.post<IStudent>(this.apiUrl, student);
  }

  updateStudent(student: IStudent): Observable<IStudent> {
    return this.http.put<IStudent>(`${this.apiUrl}/${student.id}`, student);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
