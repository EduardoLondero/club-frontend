import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembershipTypeService {
  private baseUrl = 'http://localhost:3000/api/user/membershiptype'; 

  constructor(private http: HttpClient) {}

  getMembershipTypes(): Observable<{ message: string; data: any[] }> {
    return this.http.get<{ message: string; data: any[] }>(`${this.baseUrl}`);
  }

  getMembershipTypeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createMembershipType(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateMembershipType(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteMembershipType(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
