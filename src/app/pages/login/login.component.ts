import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { LoginService } from '../../services/login.service';
import { SiteService } from '../../services/site.service';
import { environment } from '../../../environments/environment';
import { SiteBranding } from '../../models/site';


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    public model: any = {};
    public returnUrl: string;
    public version: string;
    public logoUrl: string;
    public loading = false;
    public siteBranding: SiteBranding;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private alertService: AlertService,
        private siteService: SiteService) { }

    ngOnInit() {
        // this.loginService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.version = environment.version;
        this.getLoginLogo();

      if (this.route.snapshot.queryParams['out']) {
        this.loginService.logout();
      }

    }

    login() {
        this.loading = true;
        this.loginService.login(this.model.emailAddress, this.model.password)
            .then(() => this.router.navigate([this.returnUrl]))
            .catch((error: any) => {
                this.alertService.error(error.error.message);
                this.loading = false;
            });
    }

    /*
        Set the Logo for the Login Page.
    */
    getLoginLogo() {
        this.siteService.getSiteBranding().subscribe((data) =>  {
            this.siteBranding = data;
        });
    }
}
