import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable, ValueProvider} from '@angular/core';

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
    const clonedRequest = req.clone({headers: req.headers.set('Authorization', this.token)});

    return next.handle(this.token ? clonedRequest : req);
  }

  setToken(token: string) {
    this.token = token;
  }
}

export const AUTH_HEADER_INTERCEPTOR_PROVIDER: ValueProvider = {
  provide: AuthHeaderInterceptor,
  useValue: AuthHeaderInterceptor.getInstance(),
};
