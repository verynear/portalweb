import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { SessionService } from '../../services/session.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Site } from '../../models/site';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyAccountComponent implements OnInit {
  public currentUser: User;
  public currentSite: Site;
  public sites: any = [];
  public site: Site;
  accountForm: FormGroup;

  constructor(private siteService: SiteService, private userService: UserService, private session: SessionService, private alertService: AlertService, private router: Router, public fb: FormBuilder) { 
     this.accountForm = this.fb.group({
        email: ['', [Validators.email, Validators.minLength(6)]],
        password: ['', [Validators.minLength(6), Validators.maxLength(30)]],
        verify: ['', Validators.minLength(6)],
      });
  }

  ngOnInit() {
  	this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;
    });

    this.session.getObservable('currentUser').subscribe(user => {
      this.currentUser = user;
    });
    this.accountForm.patchValue({
      email: this.currentUser.username
    });
  }

  update() {
      const user = this.currentUser;

      user.username = this.accountForm.value.email;
      user.password = this.accountForm.value.password;

      this.userService.update(user).subscribe(
          data => {
              this.alertService.success('Update successful', true);
              this.router.navigate(['/dashboard']);
          },
          error => {
              this.alertService.error(error);
          });
  }

}
