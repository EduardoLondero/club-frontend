import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  private apiUrlProvinces = 'http://localhost:3000/api/user/province';
  private apiUrlLocalities = 'http://localhost:3000/api/user/locality/findLocationByProvinceId';
  private apiUrlLocalitiesAll = 'http://localhost:3000/api/user/locality';
  
  constructor(private http: HttpClient) { }

  getProvinces(): Observable<any> {
    return this.http.get<any>(this.apiUrlProvinces);
  }

  getLocalitiesByProvince(province: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlLocalities}/${province}`);
  }

  getAllLocalities(): Observable<any> {
    return this.http.get<any>(this.apiUrlLocalitiesAll);
  }

  deleteLocality(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlLocalitiesAll}/${id}`);
  }

  deleteProvince(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlProvinces}/${id}`);
  }

  createLocality(locality: any): Observable<any> {
    return this.http.post<any>(this.apiUrlLocalitiesAll, locality);
  }
  

  createProvince(province: any): Observable<any> {
    return this.http.post<any>(this.apiUrlProvinces, province);
  }

  updateLocality(id: number, locality: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlLocalitiesAll}/${id}`, locality);
  }

  updateProvince(id: number, province: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlProvinces}/${id}`, province);
  }

}
