import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Site } from '../../models/site';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { SessionService } from '../../services/session.service';
import { SiteService } from '../../services/site.service';


@Component({
  moduleId: module.id.toString(),
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public currentUser: User;
  public currentSite: any = {};
  public sites: any = [];

  constructor(private userService: UserService,
              private session: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private siteService: SiteService) {
  }

  ngOnInit() {

    console.log("session from dashboard:  ");
    console.log(this.session);

    this.session.getObservable('currentUser')
      .subscribe((user: User) => {
        this.currentUser = user;

        console.log("Getting Current User: Dashboard");
      });

    this.session.getObservable('sites')
    .subscribe((sites: Site[]) => {
      console.log('Getting Current Sites:  Dashboard');
      this.sites = sites;
    });


  }

}
