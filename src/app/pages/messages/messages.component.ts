import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { ComposeComponent } from '../../components/compose/compose.component';
import { SessionService } from '../../services/session.service';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public currentSite: any = {};

  constructor( private session: SessionService,
               private modalService: NgbModal) { }

  ngOnInit() {
    this.currentSite = this.session.get('currentSite');
  }

  compose() {
    const modalRef = this.modalService.open(ComposeComponent);
  }

}
