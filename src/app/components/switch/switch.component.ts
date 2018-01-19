import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models/user';
import { Site } from '../../models/site';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  public currentUser: User;
  public currentSite: any = {};
  public userSites: any = [];

  constructor(private userService: UserService,
              private session: SessionService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
    this.session.getObservable('currentSite')
      .subscribe((site: Site) => this.currentSite = site);
    this.userService.getRentalSites(this.currentUser).subscribe(
            data => {
                this.userSites = data;
            },
            error => {
                this.alertService.error('Unable to retrieve sites');
            });
  }

}
