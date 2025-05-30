import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token'); // Use HttpOnly cookies if possible


  if (req.url.includes('/login')) {
    return next(req); // Pass the request without modifications
  }

  const secureReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
      //  'X-Frame-Options': 'DENY', // Prevent Clickjacking
      //  'X-XSS-Protection': '1; mode=block', // Prevent XSS
      //   'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload', // Force HTTPS
      //   'Content-Security-Policy': "default-src 'self'; script-src 'self' 'https://trusted.cdn.com'",
      //   'Cache-Control': 'no-store, no-cache, must-revalidate, private'
    },
    // withCredentials: true // Allows sending cookies with requests (for CSRF protection)
  });


  return next(secureReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.warn('Unauthorized! Redirecting to login...');
        router.navigate(['login']);
      }
      if (error.status === 403) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Don't have access please contact administrator to access ",
          showConfirmButton: false,
          timer: 3000
        })
        // router.navigate(['dashboard']);
      }
      throw error;
    })
  );
};
