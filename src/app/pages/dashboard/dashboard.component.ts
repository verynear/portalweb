import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import {SessionService} from '../../services/session.service';

@Component({
  moduleId: module.id.toString(),
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public currentUser: User;

  constructor(private session: SessionService) {
  }

  ngOnInit() {
    this.session.getObservable('currentUser')
      .subscribe((user: User) => this.currentUser = user);
  }

}
