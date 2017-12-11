import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {User} from '../models/user';
import {SessionService} from './session.service';
import {AuthHeaderInterceptor} from '../auth-header.interceptor';

@Injectable()
export class LoginService {

  constructor(
    private authService: AuthenticationService,
    private session: SessionService,
    private authInterceptor: AuthHeaderInterceptor
  ) { }

  login(username: string, password: string): Promise<User> {
    return this.authService.login(username, password)
      .then((token: string) => {
        localStorage.setItem('authorizationToken', token);
        this.authInterceptor.setToken(token);
      })
      .then(() => this.authService.getCurrentUser())
      .then((user: User) => {
        this.session.set('currentUser', user);

        return user;
      });
  }

  logout(): Promise<any> {
    return this.authService.logout()
      .then(() => localStorage.removeItem('authorizationToken'));
  }

}
