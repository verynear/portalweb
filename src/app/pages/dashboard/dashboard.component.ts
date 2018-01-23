import { Component, OnInit, ValueProvider } from '@angular/core';
import { User } from '../../models/user';
import { Site } from '../../models/site';
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
  public userSites: Site[];
  public mySite: number;
  public siteIds: any = [];
  public siteNames: any = [];
  public currentSiteId: number;
  public currentSite: any = {};
  public defaultSite = 0;
  public multiSite = false;

  constructor(private userService: UserService,
              private session: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
    this.route.params.subscribe(params => {
        if (params.site) {
          this.mySite = Number (params.site);
        } else {
          this.mySite = null;
        }
    });
  }

  ngOnInit() {
    this.session.getObservable('currentUser')
      .subscribe((user: User) => this.currentUser = user);
      console.log('prev site from session');
      console.log(localStorage.getItem('currentSiteId'));
      this.currentSiteId = Number (localStorage.getItem('currentSiteId'));
      console.log('prev set current site');
      console.log(this.currentSiteId);
      this.userService.getCurrentUserInfo().subscribe(
            data => {
                this.userSites = data['rentalSites'];
                console.log('userSites ARRAY');
                console.log(this.userSites);
                if (this.userSites.length > 1) {
                  this.multiSite = true;
                }
                console.log('mySite?:');
                console.log(this.mySite);
                if (this.mySite) {
                   for (const userSite of this.userSites) {
                     if (userSite.id === this.mySite) {
                       this.currentSite = userSite;
                     }
                   }
                  console.log('new site from param');
                  localStorage.setItem('currentSiteId', this.currentSite.id);
                } else if (this.currentSiteId) {
                  console.log('current site exists');
                  console.log(this.userSites);
                  for (const userSite of this.userSites) {
                     if (userSite.id === this.currentSiteId) {
                       this.currentSite = userSite;
                     }
                   }
                  console.log('before set localstorage');
                  console.log(this.currentSite);
                  localStorage.setItem('currentSiteId', this.currentSite.id);
                  console.log('after set local storage');
                  console.log(this.currentSite);
                } else {
                  console.log('no current site or param');
                  this.currentSite = this.userSites[this.defaultSite];
                  localStorage.setItem('currentSiteId', this.currentSite.id);
                  console.log(localStorage);
                }
                console.log('end currentSite');
                console.log(this.currentSite);
                console.log('end currentSiteId var');
                console.log(this.currentSiteId);
                console.log('end currentSiteId localstorage');
                console.log(localStorage.getItem('currentSiteId'));
            },
            error => {
                this.alertService.error('Unable to retrieve site');
            });
  }


  switchSite(id: number) {
    this.router.navigate(['/switch', id ], { skipLocationChange: false });
  }
}
