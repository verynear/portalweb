import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
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
  public mySite: number;
  public siteIds: any = [];
  public siteNames: any = [];
  public currentSite: any = {};
  public defaultSite = 0;
  public multiSite = false;

  constructor(private userService: UserService,
              private session: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
    this.route.queryParams.subscribe(params => {
        if (params['site']) {
          let mySite = params['site'];
        } else {
          let mySite = null;
        }
        console.log(this.mySite); // Print the parameter to the console.
    });
  }

  ngOnInit() {
    this.session.getObservable('currentUser')
      .subscribe((user: User) => this.currentUser = user);
      this.userService.getRentalSites(this.currentUser).subscribe(
            data => {
                this.userSites = data;
                if (this.userSites.length > 1) {
                  this.multiSite = true;
                }
                if (this.mySite) {
                  this.currentSite = this.userSites.filter(site => site.id === this.mySite);
                } else {
                  this.currentSite = this.userSites[this.defaultSite];
                }
                this.session.set('currentSite', this.currentSite);
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

  switchSite(id: number) {
    this.router.navigate(['/switch', id], { skipLocationChange: false });
  }
}
