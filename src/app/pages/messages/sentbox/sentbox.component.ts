import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeComponent } from '../../../components/compose/compose.component';
import { Router } from '@angular/router';
import { CheckboxModule } from 'primeng/primeng';

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
  loading: boolean;

  constructor(private router: Router, public messageService: MessageService, config: NgbDropdownConfig) {
    // Default values for dropdowns.
    config.autoClose = 'outside';
  }

  ngOnInit() {
    this.itemsPerPage = 25;   // Number of Mail Items per page.
    this.page = 1;            // Starting Page
    this.checkAll = false;    // By Default, all mail items unchecked.
    this.loading = true;
    this.getSentMessages();   // Get Sent Messages.
  }

  getSentMessages() {
    console.log('Getting Sent');
    this.messageService.getSent().subscribe(
      data => {
        this.loading = false;
        console.log('data');
        console.log(data);
        this.messages = data['content'];
        this.totalItems = data['totalElements'];
      },
      error => {
        console.log('Error');
      });
  }

  selectAllMessages(checkAll) {
    for (const message of this.messages) {
      message.selected = checkAll;
    }
  }

  // For sort event./
  onSorted($event) {
    console.log('Got Sort Event');
    console.log($event);
    this.messages = this.messageService.sortMessages(this.messages, $event);
  }

  openMessage(id) {
    this.router.navigate(['/messages/view', id]);
  }

}
