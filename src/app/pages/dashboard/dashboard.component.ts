import { Component, OnInit } from '@angular/core';
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
  public currentSiteId: number;
  public currentSite: any = {};
  public defaultSite = 0;

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
      this.currentSiteId = Number (localStorage.getItem('currentSiteId'));
      this.userService.getCurrentUserInfo().subscribe(
            data => {
                this.userSites = data['rentalSites'];
                if (this.mySite) {
                   for (const userSite of this.userSites) {
                     if (userSite.id === this.mySite) {
                       this.currentSite = userSite;
                     }
                   }
                  localStorage.setItem('currentSiteId', this.currentSite.id);
                } else if (this.currentSiteId) {
                  console.log('site already set. id:');
                  console.log(this.currentSiteId);
                } else {
                  this.currentSite = this.userSites[this.defaultSite];
                  localStorage.setItem('currentSiteId', this.currentSite.id);
                }
            },
            error => {
                this.alertService.error('Unable to retrieve site');
            });
  }


  switchSite(id: number) {
    this.router.navigate(['/switch', id ], { skipLocationChange: false });
  }
}
