import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AnnouncementService } from '../../services/announcement.service';
import { Message } from '../../models/message';
import { AnnouncementcomposeComponent } from '../../components/announcementcompose/announcementcompose.component';
import { NgbDropdownConfig, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  announcements: Array<any>;
  itemsPerPage: number;         // # Of Announcements Per Page
  totalItems: number;           // Total # of Announcements (For Pagination)
  page: number;                 // Current Page
  checkAll: boolean;
  loading: boolean;

  constructor(private modalService: NgbModal, public announcementService: AnnouncementService) { }

  ngOnInit() {
    this.itemsPerPage = 5;
    this.page = 1;
    this.getSentAnnouncements(this.page - 1, this.itemsPerPage);
  }

  pageChange() {
    this.nextPage(this.page - 1, this.itemsPerPage); // page-1 because NgBootstrap starts at page=1
  }

  nextPage(page, itemsPerPage) {
    console.log('nextPage: InBox');
    this.loading = true;
    this.announcementService.getSentAnnouncements(page, itemsPerPage).subscribe(
      data => {
        this.loading = false;
        this.announcements = data['content'];
        this.totalItems = data['totalPages'] * data['numberOfElements'];
      },
      error => {
        console.log('Error: getInquiries(): InboxComponent()');
      });
  }

  getSentAnnouncements(page, itemsPerPage) {
    this.announcementService.getSentAnnouncements(page, itemsPerPage).subscribe(
      data => {
        this.loading = false;
        this.announcements = data['content'];
        this.totalItems = data['totalPages'] * data['numberOfElements'];
      },
      error => {
        console.log('Error');
      });
  }

  deleteAnnouncement(id: number) {
    this.loading = true;
    this.announcementService.deleteAnnouncement(id).subscribe(
      data => {
        this.getSentAnnouncements(this.page, this.itemsPerPage);
      });
  }

  compose() {
    const options: NgbModalOptions = {backdrop: 'static', size: 'lg'};
    const modalRef = this.modalService.open(AnnouncementcomposeComponent, options);

    modalRef.result.then((userResponse) => {
      this.getSentAnnouncements(0, this.itemsPerPage);  // Get Announcements.
    });
  }

}
