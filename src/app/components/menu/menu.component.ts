import { Component, OnInit } from '@angular/core';
import { Site } from '../../models/site';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public currentUser: User;
  public userSites: Site[];
  public multiSite = false;

  constructor(private userService: UserService,
              private session: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
        this.userService.getCurrentUserInfo().subscribe(
            data => {
                this.userSites = data['rentalSites'];
                if (this.userSites.length > 1) {
                  this.multiSite = true;
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
