import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

const NO_TOKEN_REQUIRED = [
  '/rental/company/validate',
  '/betterAPI/requests'
];

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  private static instance: AuthHeaderInterceptor = null;
  private token: string;

  constructor() {
    this.token = localStorage.getItem('authorizationToken');
  }

  public static getInstance(): AuthHeaderInterceptor {
    if (AuthHeaderInterceptor.instance === null) {
      AuthHeaderInterceptor.instance = new AuthHeaderInterceptor();
    }

    return AuthHeaderInterceptor.instance;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.createNewRequest(req));
  }

  setToken(token: string) {
    this.token = token;
  }

  private createNewRequest(req: HttpRequest<any>): HttpRequest<any> {
    const skipToken = !!NO_TOKEN_REQUIRED.find(url => req.url.includes(url));

    if (!this.token || skipToken) {
      return req;
    }

    return req.clone({headers: req.headers.set('Authorization', this.token)});
  }
}
