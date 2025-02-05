import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class MembershipService {
  
    private apiUrl = 'http://localhost:3000/api/user/membership'; 
  
    constructor(private http: HttpClient) {}
  
    createMembership(membershipData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}`, membershipData);
    }

    getAllMemberships(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}`);
      }


    unsubscribeMembership(membershipId: string): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${membershipId}`);
    }

    obtenerMembresiasUsuario(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
      }

    cancelMembership(membershipId: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/cancel/${membershipId}`, {});
    }

    obtenerMembresiaPorId(membershipId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/payments/${membershipId}`);
}

      
    removeSport(membershipId: number, sportId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${membershipId}/deporte/${sportId}`);
}
  }
  
