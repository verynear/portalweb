import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { ComposeComponent } from '../../components/compose/compose.component';
import { UserService } from '../../services/user.service';
import { SiteService } from '../../services/site.service';
import { AlertService } from '../../services/alert.service';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public currentSite: any = {};
  public currentSiteId: number;
  public userSites: any = [];

  constructor( private userService: UserService,
               private alertService: AlertService,
               private modalService: NgbModal,
               private siteService: SiteService) { }

  ngOnInit() {
    this.currentSite = this.siteService.currentSite;
  }

  compose() {
    const modalRef = this.modalService.open(ComposeComponent);
  }

}
