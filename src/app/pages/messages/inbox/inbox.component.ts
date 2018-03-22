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
  inquiries: Array<Inquiry>;
  itemsPerPage: number;      // The number of emails per page.
  totalItems: number;
  page: number;
  checkAll: boolean;
  loading: boolean;
  unitReciptients: string[];

  constructor(private router: Router, public messageService: MessageService) {
  }

  ngOnInit() {
    this.loading = true;
    this.itemsPerPage = 25;   // Number of Mail Items per page.
    this.page = 1;            // Starting Page
    this.checkAll = false;    // By Default, all mail items unchecked.
    this.getInquiries(this.page - 1, this.itemsPerPage);
  }

  pageChange() {
    this.nextPage(this.page - 1, this.itemsPerPage); // page-1 because NgBootstrap starts at page=1
  }

  getInquiries(page, itemsPerPage) {
    this.loading = true;
    this.messageService.getInquiries(page, itemsPerPage).subscribe(
      data => {
        this.loading = false;
        this.inquiries = data['generalInquiries'];
        this.totalItems = data['totalPages'] * data['numberOfElements'];
      },
      error => {
        this.loading = false;
        console.log('Error: getInquiries(): InboxComponent()');
      });
  }

  nextPage(page, itemsPerPage) {
    this.loading = true;
    this.messageService.getInquiries(page, itemsPerPage).subscribe(
      data => {
        this.loading = false;
        this.inquiries = data['generalInquiries'];
        this.inquiries = [];
      },
      error => {
        this.loading = false;
        console.log('Error: nextPage(): InboxComponent()');
      });
  }

  refresh() {
    this.getInquiries(0, this.itemsPerPage);
  }

  selectAllInquiries(checkAll) {
    for (const inquiry of this.inquiries) {
      inquiry.selected = checkAll;
    }
  }

  // For sort event./
  onSorted($event) {
    this.inquiries = this.messageService.sortInquiries(this.inquiries, $event);
  }

  openInquiry(id: number) {
    this.loading = true;
    this.router.navigate(['/messages/inbox', id]);
  }

}
