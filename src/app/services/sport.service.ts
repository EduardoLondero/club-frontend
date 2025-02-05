import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SportsService {
  private baseUrl = 'http://localhost:3000/api/user/sport';

  constructor(private http: HttpClient) {}

  private selectedSport: any = null;

  setSelectedSport(sport: any) {
    this.selectedSport = sport;
  }

  getSelectedSport() {
    return this.selectedSport;
  }


   getSports(): Observable<{ message: string; data: any[] }> {
    return this.http.get<{ message: string; data: any[] }>(`${this.baseUrl}`);}

  getSportById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createSport(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateSport(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteSport(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getDeporteByNombre(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/findByName/${nombre}`);
  }

  inscribirDeporte(sportId: number, membershipId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/inscribirDeporte`, {
      sportId,
      membershipId,
    });
  }
}
