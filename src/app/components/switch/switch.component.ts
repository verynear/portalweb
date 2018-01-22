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
  public mySite: number;
  public currentSite: any = {};
  public userSites: any = [];

  constructor(private userService: UserService,
              private session: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
         this.route.params.subscribe(params => {
               this.mySite = params.site;
             console.log(this.mySite); // Print the parameter to the console.
         }); }

  ngOnInit() {
    this.userService.getCurrentUserInfo().subscribe(
            data => {
                this.userSites = data['rentalSites'];
                for (const userSite of this.userSites) {
                     if (userSite.id == this.mySite) {
                       this.currentSite = userSite;
                     }
                   }
                console.log(this.currentSite);
            },
            error => {
                this.alertService.error('Unable to retrieve sites');
            });
  }

  switchSite(id: number) {
    this.router.navigate(['/dashboard', id ], { skipLocationChange: false });
  }

}
