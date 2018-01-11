import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeComponent } from '../../../components/compose/compose.component';

@Component({
  selector: 'app-sentbox',
  templateUrl: './sentbox.component.html',
  styleUrls: ['./sentbox.component.scss']
})
export class SentboxComponent implements OnInit {
  messages: Array<any>;
  itemsPerPage: number;      // The number of emails per page.
  totalItems: number;
  page: number;
  checkAll: boolean;

  constructor(public messageService: MessageService, config: NgbDropdownConfig) {
    // Default values for dropdowns.
    config.autoClose = 'outside';
  }

  ngOnInit() {
    this.itemsPerPage = 25;   // Number of Mail Items per page.
    this.page = 1;            // Starting Page
    this.checkAll = false;    // By Default, all mail items unchecked.
    this.getSentMessages();   // Get Sent Messages.
  }

  getSentMessages() {
    this.messageService.getSent().subscribe(
      data => {
        this.messages = data;
        this.totalItems = data.length;
      },
      error => {
        console.log('Error');
      });
  }

  selectAllMessages(checkAll) {
    for (const message of this.messages) {
      message.selected = !checkAll;
    }
  }

  // For sort event./
  onSorted($event) {
    console.log('Got Sort Event');
    console.log($event);
    this.messages = this.messageService.sortMessages(this.messages, $event);
  }

  openMessage(id) {
    console.log('You\'ve Opened' + id);
    // TODO: Create a new component for reading messages.
  }

}
