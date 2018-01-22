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
    this.route.params.subscribe(params => {
        if (params.site) {
          this.mySite = Number (params.site);
        } else {
          this.mySite = null;
        }
        console.log('params');
        console.log(params.site);
        console.log(this.mySite); // Print the parameter to the console.
    });
  }

  ngOnInit() {
    this.session.getObservable('currentUser')
      .subscribe((user: User) => this.currentUser = user);
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
                  console.log('this mySite');
                  console.log(this.mySite);
                  console.log('currentsiteafterfilter');
                  console.log(this.currentSite);
                } else {
                  this.currentSite = this.userSites[this.defaultSite];
                }
                console.log('set currentSite');
                console.log(this.currentSite);
                this.session.set('currentSite', this.currentSite);
            },
            error => {
                this.alertService.error('Unable to retrieve site');
            });
  }


  switchSite(id: number) {
    this.router.navigate(['/switch', id ], { skipLocationChange: false });
  }
}
