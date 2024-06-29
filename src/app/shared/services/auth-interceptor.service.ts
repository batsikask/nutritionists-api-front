import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  private ignoreEndpoints : string[] = ['auth/login', 'auth/registration'];

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const shouldIgnore = this.ignoreEndpoints.some(endpoint => req.url.includes(endpoint));
    if (shouldIgnore) {
      return next.handle(req);
    }
    
    const authToken = localStorage.getItem('accessToken');
    console.log('authToken', authToken);
    if (!authToken) {
      return next.handle(req);
    }

    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next.handle(authRequest);
  }
}