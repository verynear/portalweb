import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { Inquiry } from '../../models/inquiry';
import { ComposeComponent } from '../../components/compose/compose.component';
import { UserService } from '../../services/user.service';
import { SiteService } from '../../services/site.service';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../services/alert.service';
import { SessionService } from '../../services/session.service';
import { Site } from '../../models/site';
import { User } from '../../models/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public currentUser: User;

  constructor( private userService: UserService,
               private modalService: NgbModal,
               private messageService: MessageService,
               private sessionService: SessionService,
               private alertService: AlertService,
               private router: Router) { }

  ngOnInit() {
    this.currentUser = this.sessionService.get('currentUser');
  }

  viewingSent() {
    if (this.router.url.includes('messages/sent/')) {
      return true;
    }

    return false;
  }

  viewingReceived() {
    if (this.router.url.includes('messages/inbox/')) {
      return true;
    }

    return false;
  }

  onSentBox() {
    if (this.router.url.includes('messages/sent')) {
      return true;
    }

    return false;
  }

  onInbox() {
    if (this.router.url.includes('messages/inbox')) {
      return true;
    }

    return false;
  }

  refreshSent() {
     this.messageService.onSent();
  }

  refreshInbox() {
      this.messageService.onRefresh();
  }

  compose() {
    const modalRef = this.modalService.open(ComposeComponent, { size: 'lg' });
  }

  isInbox() {
    return this.router.url === '/messages/inbox';
  }

  isSentBox() {
    return this.router.url === '/messages/sent';
  }

}
