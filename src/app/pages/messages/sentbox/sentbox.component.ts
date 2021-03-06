import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HtmlToPlainPipe } from '../../../pipes/html-to-plain.pipe';
import { FilterUnitsPipe } from '../../../pipes/filter-units.pipe';
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
  messages: Array<Message>;
  itemsPerPage: number;      // The number of emails per page.
  totalItems: number;
  page: number;
  checkAll: boolean;
  loading: boolean;

  constructor(private router: Router, public messageService: MessageService, config: NgbDropdownConfig) {
    config.autoClose = 'outside';

  }

  ngOnInit() {
    this.loading = true;
    this.itemsPerPage = 25;   // Number of Mail Items per page.
    this.page = 1;            // Starting Page
    this.checkAll = false;    // By Default, all mail items unchecked.
    this.getSentMessages(this.page - 1, this.itemsPerPage);
  }

  pageChange() {  // TODO: Why is this called on init?
    this.nextPage(this.page - 1, this.itemsPerPage); // page-1 because NgBootstrap starts at page=1
  }

  getSentMessages(page, itemsPerPage) {
    this.loading = true;
    this.messageService.getSent(page, itemsPerPage).subscribe(
      data => {
        this.loading = false;
        this.messages = data['messages'];
        this.totalItems = data['totalPages'] * data['numberOfElements'];
      },
      error => {
        console.log('Error: getSentMessages(): SentboxComponent()');
        this.loading = false;
      });
  }

  nextPage(page, itemsPerPage) {
    this.loading = true;
    this.messageService.getSent(page, itemsPerPage).subscribe(
      data => {
        this.loading = false;
        this.messages = data['messages'];
      },
      error => {
        this.loading = false;
        console.log('Error: nextPage(): SentboxComponent()');
      });
  }

  selectAllMessages(checkAll) {
    for (const message of this.messages) {
      message.selected = checkAll;
    }
  }

  refresh() {
    this.getSentMessages(0, this.itemsPerPage);
  }

  openMessage(id: number) {
    this.loading = true;
    this.router.navigate(['/messages/sent', id]);
  }

  openReport(id: number) {
    this.loading = true;
    this.router.navigate(['/report/message-report', id]);
  }

  // For sort event./
  onSorted($event) {
    this.messages = this.messageService.sortMessages(this.messages, $event);
  }

}
