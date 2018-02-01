import { Component, OnInit } from '@angular/core';
import { Site } from '../../models/site';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { SiteService } from '../../services/site.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public currentUser: User;
  public sites: any = [];
  public multiSite: boolean;

  constructor(private userService: UserService,
              private session: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private siteService: SiteService) { }

  ngOnInit() {
        console.log("Constructor:  Menu");
        
        // this.session.getObservable('currentUser')
        //   .subscribe((user: User) => {
        //     console.log("Getting Current User:  Menu");
        //     this.currentUser = user;
        //   }
        // );

        console.log("session from menu:  ");
        console.log(this.session);

        this.session.getObservable('sites')
          .subscribe((sites: Site[]) => {
          
          console.log("Getting Current Sites: Menu");
          if (sites.length > 1) {
            this.multiSite = true;
          }

          this.sites = sites;
        });
  }

  // switchSite(site) {
  //   this.siteService.currentSite = site;
  // }
}
