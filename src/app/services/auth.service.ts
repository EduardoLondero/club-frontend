import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/user/auth/login';

  constructor(private http: HttpClient,private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl, { email, password });
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken'); 
    this.router.navigate(['/home']); 
  }

  getUserRole(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = this.decodeToken(token);
      console.log('Decoded token:', decoded); 
      if (decoded && decoded.roleId !== undefined) {
        return decoded.roleId;
      }
    }
    return 0;  
  }

  getUserId(): number | null {
    const token = localStorage.getItem('authToken');
    if (token){const decodedToken = this.decodeToken(token);
      if (decodedToken && decodedToken.userId !== undefined) {
        return decodedToken.userId; 
      }
    }
    return null;
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = this.decodeToken(token);
    if (decoded && decoded.exp) {
      const expirationDate = new Date(decoded.exp * 1000);
      return expirationDate < new Date(); 
    }
    return false;
  }
}
