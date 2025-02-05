import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {}


  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, userData);
  }


  getUserProfile(userId: string): Observable<any> {
    const token = this.authService.getToken();

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get(`${this.apiUrl}/user/${userId}`, { headers });
    } else {
      console.error('No se encontró el token');
      return new Observable(observer => {
        observer.error('No se encontró el token');
      });
    }
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`).pipe(
      catchError(error => {
        console.error('Error al obtener los usuarios', error);
        return of({ success: false, message: 'No se pudieron obtener los usuarios.' });
      })
    );
  }


    updateUser(userId: number, userData: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/user/${userId}`, userData).pipe(
        catchError((error) => {
          console.error('Error al actualizar los datos del usuario', error);
          return of({ success: false, message: 'No se pudo actualizar los datos del usuario.' });
        })
      );
}
}
