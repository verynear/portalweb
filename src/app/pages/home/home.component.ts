import {Component, OnInit} from '@angular/core';

import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {SessionService} from '../../services/session.service';

@Component({
  moduleId: module.id.toString(),
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService,
              private session: SessionService) {
    this.currentUser = this.session.get('currentUser');
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe((users: User[]) => this.users = users);
  }
}
