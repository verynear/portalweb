import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  totalItems: number;
  loading: boolean;
  loading1: boolean;
  public currentSite: Site;
  public indiMessage: boolean;

  constructor( private userService: UserService,
               private alertService: AlertService,
               private modalService: NgbModal,
               private siteService: SiteService,
               private sessionService: SessionService,
               private router: Router) { }

  ngOnInit() {
    this.currentUser = this.sessionService.get('currentUser');

  }

  isInbox() {
    return this.router.url === '/messages/inbox';
  }

  isSentbox() {
    return this.router.url === '/messages/sent';
  }


  viewingMessage() {
    if (this.router.url.includes('messages/view')) {
      return true;
    }

    return false;
  }

  viewingInquiry() {
    if (this.router.url.includes('messages/inquiry')) {
      return true;
    }

    return false;
  }

  compose() {
    const modalRef = this.modalService.open(ComposeComponent);
  }

}
