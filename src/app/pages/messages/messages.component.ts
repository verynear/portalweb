import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { ComposeComponent } from '../../components/compose/compose.component';
import { UserService } from '../../services/user.service';
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
               private modalService: NgbModal) { }

  ngOnInit() {
    this.currentSiteId = Number (localStorage.getItem('currentSiteId'));
    this.userService.getCurrentUserInfo().subscribe(
            data => {
                this.userSites = data['rentalSites'];
                for (const userSite of this.userSites) {
                     if (userSite.id === this.currentSiteId) {
                       this.currentSite = userSite;
                     }
                   }
            },
            error => {
                this.alertService.error('Unable to retrieve sites');
            });
  }

  compose() {
    const modalRef = this.modalService.open(ComposeComponent);
  }

}
