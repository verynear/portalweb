import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HtmlToPlainPipe } from '../../../pipes/html-to-plain.pipe';
import { FilterUnitsPipe } from '../../../pipes/filter-units.pipe';
import { MessageService } from '../../../services/message.service';
import { Inquiry } from '../../../models/inquiry';
import { ComposeComponent } from '../../../components/compose/compose.component';
import { CheckboxModule } from 'primeng/primeng';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  pageName = 'Received';

  inquiries: Array<Inquiry>;
  itemsPerPage1: number;      // The number of emails per page.
  totalItems1: number;
  page1: number;
  checkAll1: boolean;
  loading1: boolean;
  loading: boolean;
  unitReciptients: string[];

  constructor(private router: Router, public messageService: MessageService) {}

  ngOnInit() {
    console.log('ngOnInit: InBox');
    this.loading1 = true;
    this.loading = true;
    this.itemsPerPage1 = 25;   // Number of Mail Items per page.
    this.page1 = 1;            // Starting Page
    this.checkAll1 = false;    // By Default, all mail items unchecked.
    this.getInquiries(this.page1 - 1, this.itemsPerPage1);
  }

  pageChange() {
    console.log('pageChange: SentBox');
    this.nextPage(this.page1 - 1, this.itemsPerPage1); // page-1 because NgBootstrap starts at page=1
  }

  getInquiries(page1, itemsPerPage1) {
    console.log('getSentMessages: SentBox');
    this.loading1 = true;
    this.messageService.getInquiries(page1, itemsPerPage1).subscribe(
      data => {
        this.loading1 = false;
        this.inquiries = data['generalInquiries'];
        this.totalItems1 = data['totalPages'] * data['numberOfElements'];
        console.log(this.loading1);
      },
      error => {
        this.loading1 = false;
        console.log('Error: getInquiries(): InboxComponent()');
      });
  }

  nextPage(page1, itemsPerPage1) {
    console.log('nextPage: InBox');
    this.loading1 = true;
    this.messageService.getInquiries(page1, itemsPerPage1).subscribe(
      data => {
        this.loading1 = false;
        this.inquiries = data['generalInquiries'];
      },
      error => {
        console.log('Error: getInquiries(): InboxComponent()');
      });
  }

  selectAllInquiries(checkAll1) {
    for (const inquiry of this.inquiries) {
      inquiry.selected = checkAll1;
    }
  }

  // For sort event./
  onSorted($event) {
    this.inquiries = this.messageService.sortInquiries(this.inquiries, $event);
  }

  openInquiry(id: number) {
    this.router.navigate(['/messages/inquiry', id]);
  }

}