import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(username: string, password: string): Observable<void> {
    return of(void 0).pipe(
      delay(1000),
      tap(() => {
        if (username === 'admin' && password === 'admin') {
          this.isAuthenticatedSubject.next(true);
        } else {
          throw new Error('Credenciales inválidas');
        }
      }),
      catchError((err: any) => throwError(() => new Error('Credenciales inválidas')))
    );
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }
}
