import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {SessionService} from './services/session.service';
import {User} from './models/user';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService,
              private session: SessionService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if there is user in the session
    const currentUser = this.session.get('currentUser');

    if (!currentUser) {
      // get the user's info from api
      return this.authService.getCurrentUser()
        // save it in the session
        .then((user: User) => this.session.set('currentUser', user))

        // return ok to the AuthGuard
        .then(() => true)

        // if server rejects the request
        .catch(() => {
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          return false;
        });
    }

    // there's a valid user in the session
    return true;
  }
}
