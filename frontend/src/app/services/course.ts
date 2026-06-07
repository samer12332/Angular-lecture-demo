import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICourse } from '../models/icourse';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.apiUrl);
  }

  getCourseById(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.apiUrl}/${id}`);
  }

  addCourse(course: Omit<ICourse, '_id'>): Observable<ICourse> {
    return this.http.post<ICourse>(this.apiUrl, course);
  }

  updateCourse(
    id: string,
    course: Partial<Omit<ICourse, '_id'>>,
  ): Observable<ICourse> {
    return this.http.put<ICourse>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
