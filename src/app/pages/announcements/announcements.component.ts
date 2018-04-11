import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AnnouncementService } from '../../services/announcement.service';
import { Message } from '../../models/message';
import { AlertService } from '../../services/alert.service';
import { AnnouncementcomposeComponent } from '../../components/announcementcompose/announcementcompose.component';
import { NgbDropdownConfig, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

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
  deleteLoad: boolean;

  constructor(private modalService: NgbModal, public announcementService: AnnouncementService, private alertService: AlertService) { }

  ngOnInit() {
    this.itemsPerPage = 5;
    this.page = 1;
    this.getSentAnnouncements(this.page - 1, this.itemsPerPage);
  }

  pageChange() {
    this.nextPage(this.page - 1, this.itemsPerPage); // page-1 because NgBootstrap starts at page=1
  }

  nextPage(page, itemsPerPage) {
    this.loading = true;
    this.announcementService.getSentAnnouncements(page, itemsPerPage).subscribe(
      data => {
        this.loading = false;
        this.announcements = data['content'];
      });
  }

  getSentAnnouncements(page, itemsPerPage) {
    this.loading = true;
    this.announcementService.getSentAnnouncements(page, itemsPerPage).subscribe(
      data => {
        this.loading = false;
        this.announcements = data['content'];
        this.totalItems = data['totalPages'] * data['numberOfElements'];
      });
  }

  deleteAnnouncement(id: number) {
    const options: NgbModalOptions = {backdrop: 'static', size: 'sm'};
    const modalRef = this.modalService.open(ConfirmModalComponent, options);

    modalRef.result.then((userResponse) => {

      if (userResponse === 'success') {
        this.deleteLoad = true;
        this.announcementService.deleteAnnouncement(id).subscribe(
          result => {
            this.deleteLoad = false;
            this.getSentAnnouncements(this.page, this.itemsPerPage);
          },
          error => {
            this.deleteLoad = false;
            console.log('Error: deleteAnnouncement: announcementComponent');
          });
      }
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
