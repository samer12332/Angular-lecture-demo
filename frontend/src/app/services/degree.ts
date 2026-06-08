import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDegree } from '../models/idegree';
import { IPaginatedResponse } from '../models/ipaginated-response';

export interface ICreateDegreePayload {
  student: string;
  course: string;
  degree: number;
}

export interface IUpdateDegreePayload {
  student?: string;
  course?: string;
  degree?: number;
}

@Injectable({
  providedIn: 'root',
})
export class DegreeService {
  private apiUrl = 'http://localhost:3000/degrees';

  constructor(private http: HttpClient) {}

  getAllDegrees(page = 1, limit = 10): Observable<IPaginatedResponse<IDegree>> {
    return this.http.get<IPaginatedResponse<IDegree>>(
      `${this.apiUrl}?page=${page}&limit=${limit}`,
    );
  }

  getDegreeById(id: string): Observable<IDegree> {
    return this.http.get<IDegree>(`${this.apiUrl}/${id}`);
  }

  addDegree(payload: ICreateDegreePayload): Observable<IDegree> {
    return this.http.post<IDegree>(this.apiUrl, payload);
  }

  updateDegree(
    id: string,
    payload: IUpdateDegreePayload,
  ): Observable<IDegree> {
    return this.http.put<IDegree>(`${this.apiUrl}/${id}`, payload);
  }

  deleteDegree(id: string): Observable<{ message: string; deletedDegree: IDegree }> {
    return this.http.delete<{ message: string; deletedDegree: IDegree }>(
      `${this.apiUrl}/${id}`,
    );
  }

  getDegreesByStudent(studentId: string): Observable<IDegree[]> {
    return this.http.get<IDegree[]>(`${this.apiUrl}/student/${studentId}`);
  }

  getDegreesByCourse(courseId: string): Observable<IDegree[]> {
    return this.http.get<IDegree[]>(`${this.apiUrl}/course/${courseId}`);
  }
}
