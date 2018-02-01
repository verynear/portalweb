import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HtmlToPlainPipe } from '../../../pipes/html-to-plain.pipe';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message';
import { ComposeComponent } from '../../../components/compose/compose.component';
import { CheckboxModule } from 'primeng/primeng';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    messageService.onSent$.subscribe(sent => {
      this.onModalSend();
    });
  }

  ngOnInit() {
    this.itemsPerPage = 25;   // Number of Mail Items per page.
    this.page = 1;            // Starting Page
    this.checkAll = false;    // By Default, all mail items unchecked.
    this.loading = true;
    this.getSentMessages(this.page, this.itemsPerPage);   // Get Sent Messages.
  }

  pageChange($pageChange) {
    console.log('Page Changed');
    console.log($pageChange);
  }

  getSentMessages(page, itemsPerPage) {
    this.messageService.getSent(page, itemsPerPage).subscribe(
      data => {
        this.loading = false;
        this.messages = data['messages'];
        this.totalItems = data['totalPages'];
      },
      error => {
        console.log('Error: getSentMessages(): SentboxComponent()');
      });
  }

  selectAllMessages(checkAll) {
    for (const message of this.messages) {
      message.selected = checkAll;
    }
  }

  // For sort event./
  onSorted($event) {
    this.messages = this.messageService.sortMessages(this.messages, $event);
  }

  onModalSend() {
    this.page = 1;
    this.loading = true;
    this.getSentMessages(this.itemsPerPage, this.page);
  }

  openMessage(id) {
    this.router.navigate(['/messages/view', id]);
  }

}
