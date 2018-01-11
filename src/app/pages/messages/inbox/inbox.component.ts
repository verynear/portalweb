import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  messages = [];

  constructor(public messageService: MessageService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.messageService.get().subscribe(
      data => {
        console.log('Youve received messages');
        this.messages = data;
        console.log(data[0].subject);
      },
      error => {
        console.log('Error');
      });
  }

  openMessage(id) {
    console.log('Youve Opened' + id);
    // TODO: Create a new component for reading messages.
  }

}
