import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  private token: string;

  constructor() {
    this.token = localStorage.getItem('authorizationToken');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({headers: req.headers.set('Authorization', this.token)});

    return next.handle(this.token ? clonedRequest : req);
  }

  setToken(token: string) {
    this.token = token;
  }
}
