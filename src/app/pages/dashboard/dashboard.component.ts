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
              console.log('Dashboard:  Constructor');
  }

  ngOnInit() {
    console.log('Dashboard:  NgOnInit');
    this.session.getObservable('currentUser')
      .subscribe((user: User) => this.currentUser = user);

    this.siteService.getRentalSites().subscribe((sites: Site[]) => {
      this.sites = sites;
    });
  }

}
