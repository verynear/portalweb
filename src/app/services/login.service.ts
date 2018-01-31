import {EventEmitter, Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router, ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {Site} from '../models/site';
import {SessionService} from './session.service';
import {AlertService} from './alert.service';
import {SiteService} from './site.service';
import {AuthHeaderInterceptor} from '../auth-header.interceptor';

@Injectable()
export class LoginService {
  public onLogin = new EventEmitter<User | boolean>();
  public userSites: any = [];
  public currentSite: any = {};
  public defaultSite = 0; // TEMP until defaultSite attribute added to user

  constructor(
    private authService: AuthenticationService,
    private session: SessionService,
    private alertService: AlertService,
    private authInterceptor: AuthHeaderInterceptor,
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService
  ) { }

  login(username: string, password: string): Promise<User> {
    return this.authService.login(username, password)
      .then((token: string) => {
        localStorage.setItem('authorizationToken', token);
        this.authInterceptor.setToken(token);
      })
      .then(() => this.getCurrentUser())
      .then((user: User) => {
        this.session.set('currentUser', user);
        this.siteService.getRentalSites(user)
        .subscribe(
            data => {
                this.userSites = data;
                this.siteService.setUserSites(this.userSites);
                this.currentSite = this.userSites[this.defaultSite];
                this.siteService.setCurrentSite(this.currentSite);
                console.log('login service default site');
                console.log(this.currentSite);
            },
            error => {
                this.alertService.error('Unable to retrieve site');
            });
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
