import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;

  constructor(private siteService: SiteService, private userService: UserService, private session: SessionService) { }

  ngOnInit() {
  	this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;
    });

    this.session.getObservable('currentUser').subscribe(user => {
      this.currentUser = user;
    });
  }

  createFormControls() {

  	 this.password = new FormControl('', Validators.minLength(6));
    this.passwordConfirm = new FormControl('', Validators.minLength(6)),
        this.type = new FormControl('', Validators.required);
        this.rentalsiteBuildingIds = new FormControl('');
        this.rentalsiteBuildingUnitIds = new FormControl('');
        this.buildingIdforUnit = new FormControl('');
        this.buildingIdforTenantUnit = new FormControl('');
        this.tenantIds = new FormControl('');
        this.messageType = new FormControl('', Validators.required);
        this.subject = new FormControl('', Validators.required);
        this.message = new FormControl('', Validators.required);
    }

    createForm() {
    	this.heroForm = new FormGroup({
    	    'email': new FormControl(this.hero.name, [
    	      Validators.required,
    	      Validators.minLength(4),
    	      forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
    	    ]),
    	    'alterEgo': new FormControl(this.hero.alterEgo),
    	    'power': new FormControl(this.hero.power, Validators.required)
    	  });
        this.accountForm = new FormGroup({
            'email': this.type,
            rentalsiteBuildingIds: this.rentalsiteBuildingIds,
            rentalsiteBuildingUnitIds: this.rentalsiteBuildingUnitIds,
            buildingIdforUnit: this.buildingIdforUnit,
            buildingIdforTenantUnit: this.buildingIdforTenantUnit,
            tenantIds: this.tenantIds,
            messageType: this.messageType,
            subject: this.subject,
            message: this.message
        });
    }

}
