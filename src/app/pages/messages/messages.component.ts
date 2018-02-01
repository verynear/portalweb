import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { ComposeComponent } from '../../components/compose/compose.component';
import { UserService } from '../../services/user.service';
import { SiteService } from '../../services/site.service';
import { AlertService } from '../../services/alert.service';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../../services/session.service';
import { Site } from '../../models/site';
import { User } from '../../models/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public sites: any = [];
  public userSites: any = [];
  public currentUser: User;

  constructor( private userService: UserService,
               private alertService: AlertService,
               private modalService: NgbModal,
               private siteService: SiteService,
               private sessionService: SessionService) { }

  ngOnInit() {

    this.sessionService.getObservable('currentUser')
    .subscribe((user: User) => this.currentUser = user);

    this.sessionService.getObservable('sites')
      .subscribe((sites: Site[]) => {
      console.log('Getting Current Sites');
      this.sites = sites;
    });


  }

  compose() {
    console.log('Compose');
    const modalRef = this.modalService.open(ComposeComponent);
  }

}
