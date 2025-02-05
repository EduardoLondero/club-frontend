import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  dni: string;
  email: string;
  numberPhone: string;
  address: string;
  gender: string;
  birthdate: string;
  password: string;
  confirmPassword: string;
  province: string;
  locality: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:3000/api/user/user ';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
