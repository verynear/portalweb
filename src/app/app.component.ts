import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import {User} from './models/user';
import {Site} from './models/site';
import {SessionService} from './services/session.service';
import {SiteService} from './services/site.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public hasAuth = false;

  constructor(private loginService: LoginService, private sessionService: SessionService, private siteService: SiteService) {

  }


  ngOnInit() {
    this.loginService.onLogin.subscribe((user: User | boolean) => {
      this.siteService.init();
      this.hasAuth = !!user;
    });
  }
}
