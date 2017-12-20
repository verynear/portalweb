import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import {LoginService} from '../../services/login.service';


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.loginService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      if (this.route.snapshot.queryParams['out']) {
        this.loginService.logout();
      }
    }

    login() {
        this.loading = true;
        this.loginService.login(this.model.emailAddress, this.model.password)
            .then(() => this.router.navigate([this.returnUrl]))
            .catch((error: any) => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
}
