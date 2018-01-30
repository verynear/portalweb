import { Component, OnInit } from '@angular/core';
import { Site } from '../../models/site';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SiteService } from '../../services/site.service';
import { AlertService } from '../../services/alert.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public currentUser: User;
  public userSites: any = [];
  public multiSite = false;

  constructor(private userService: UserService,
              private session: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private siteService: SiteService) { }

  ngOnInit() {
        this.session.getObservable('currentUser')
        .subscribe((user: User) => this.currentUser = user);
        this.siteService.getRentalSites(this.currentUser)
        .subscribe(
            data => {
                this.userSites = data;
                if (this.userSites.length > 1) {
                  this.multiSite = true;
                }
            },
            error => {
                this.alertService.error('Unable to retrieve site');
            });
  }

  switchSite(site: Site) {
    this.siteService.setCurrentSite(site);
     setTimeout(() => {
       this.siteService.onSwitch();
       this.router.navigate(['/dashboard'], { skipLocationChange: false });
        }, 500);
  }

}
