import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const authToken = authService.getToken();
  if (authToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(clonedRequest);
  }
  return next(req);
};
