import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { AnnouncementcomposeComponent } from '../../components/announcementcompose/announcementcompose.component';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  messages: Array<any>;
  itemsPerPage: number;      // The number of emails per page.
  totalItems: number;
  page: number;
  checkAll: boolean;
  loading: boolean;

  constructor(private modalService: NgbModal, public messageService: MessageService) { }

  ngOnInit() {
    this.itemsPerPage = 25;   // Number of Mail Items per page.
    this.page = 1;            // Starting Page
    this.loading = true;
    this.getSentAnnouncements();   // Get Sent Messages.
  }

  getSentAnnouncements() {
    this.messageService.getSentAnnouncements().subscribe(
      data => {
        this.loading = false;
        this.messages = data;
        this.totalItems = data.length;
      },
      error => {
        console.log('Error');
      });
  }

  // For sort event./
  onSorted($event) {
    console.log('Got Sort Event');
    console.log($event);
    this.messages = this.messageService.sortMessages(this.messages, $event);
  }

  compose() {
    const modalRef = this.modalService.open(AnnouncementcomposeComponent);
  }

}
