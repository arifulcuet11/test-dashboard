import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('token') != null) {
      const clonedReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => { },
          err => {
            if (err.status == 401) {
              localStorage.removeItem('token');
              this.router.navigateByUrl('/login');
            }
          }
        )
      )
    }
    else if (localStorage.getItem('tv_token') != null) {
      const clonedReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('tv_token'))
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => { },
          err => {
            if (err.status == 401) {
              localStorage.removeItem('tv_token');
              this.router.navigateByUrl('/error403');
            }
          }
        )
      )
    }
    else
      return next.handle(request.clone());
  }
}
