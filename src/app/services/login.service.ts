import {EventEmitter, Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router, ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {SessionService} from './session.service';
import {AlertService} from './alert.service';
import {AuthHeaderInterceptor} from '../auth-header.interceptor';
import {SiteService} from './site.service';

@Injectable()
export class LoginService {
  public onLogin = new EventEmitter<User | boolean>();

  constructor(
    private authService: AuthenticationService,
    private siteService: SiteService,
    private session: SessionService,
    private alertService: AlertService,
    private authInterceptor: AuthHeaderInterceptor,
    private route: ActivatedRoute,
    private router: Router

  ) {
    console.log('LoginService:  Constructor');

  }

  login(username: string, password: string): Promise<User> {
    return this.authService.login(username, password)
      .then((token: string) => {
        localStorage.setItem('authorizationToken', token);
        this.authInterceptor.setToken(token);
      })
      .then(() => this.getCurrentUser())
      .then((user: User) => {
        this.session.set('currentUser', user);
        return user;
      });
    }

  logout(): Promise<any> {
    this.onLogin.emit(false);
    return this.authService.logout()
      .then(() => {
        localStorage.removeItem('authorizationToken');
        this.router.navigate(['login']);
      });
  }

  getCurrentUser() {
    const current = this.authService.getCurrentUser();
    current.then((user: User) => this.onLogin.emit(user))
      .catch(() => this.onLogin.emit(false));

    return current;
  }
}
