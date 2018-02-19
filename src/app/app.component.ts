import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import {User} from './models/user';
import {SessionService} from './services/session.service';
import {SiteService} from './services/site.service';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';
import {RentalService} from './services/rental.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public hasAuth = false;
  public brandingCSS: SafeValue;

  constructor(
    private loginService: LoginService,
    private sessionService: SessionService,
    private siteService: SiteService,
    private rentalService: RentalService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    console.log('Hi from App Component');

    this.addLoginListener();
    this.validateDomain();

    console.log('About to get Branding CSS');
    this.brandingCSS = this.sanitizer.bypassSecurityTrustResourceUrl(this.rentalService.getBrandingCssUrl());

    this.rentalService.getBrandingData().then(data => {
      console.log('The data is... ... ');
      console.log(data);
    });

    console.log(this.brandingCSS);


  }

  private addLoginListener(): void {
    this.loginService.onLogin.subscribe((user: User | boolean) => {
      this.siteService.init();
      this.hasAuth = !!user;
    });
  }

  private validateDomain(): void {



    this.rentalService.checkSubdomain()
      .then((isValidDomain: boolean) => {

        if (!isValidDomain) {
          // this.sessionService.set('invalidDomain', true);
          this.router.navigate(['invalid-domain']);
        } else {
          // this.sessionService.set('invalidDomain', false);
        }
      });
  }
}
