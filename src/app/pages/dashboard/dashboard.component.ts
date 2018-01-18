import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { SessionService } from '../../services/session.service';


@Component({
  moduleId: module.id.toString(),
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public currentUser: User;
  public userSites: any = [];
  public siteIds: any = [];
  public siteNames: any = [];
  public currentSiteId: number;
  public currentSiteName: string;
  public defaultSite = 0;
  public multiSite = false;

  constructor(private userService: UserService,
              private session: SessionService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.session.getObservable('currentUser')
      .subscribe((user: User) => this.currentUser = user);
      this.userService.getRentalSites(this.currentUser).subscribe(
            data => {
                this.userSites = data;
                this.getSiteIds(this.userSites);
                if (this.siteIds.length > 1) {
                  this.multiSite = true;
                }
                this.currentSiteId = this.siteIds[this.defaultSite];
                this.currentSiteName = this.siteNames[this.defaultSite];
                console.log(this.currentSiteId);
                this.userService.setCurrentSiteId(this.currentSiteId);
            },
            error => {
                this.alertService.error('Unable to retrieve site');
            });
  }

  getSiteIds(userSites) {
    for (const site of userSites) {
      this.siteIds.push(site.id);
      this.siteNames.push(site.name);
    }
  }
}
