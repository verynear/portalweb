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
    this.getSentAnnouncements();  
  }

  getSentAnnouncements() {
    console.log('getting announcements');
    this.announcementService.getSentAnnouncements().subscribe(
      data => {
        this.loading = false;
        this.announcements = data['content'];
        this.totalItems = data['content'].length;
      },
      error => {
        console.log('Error');
      });
  }

  deleteAnnouncement(id: number) {
    console.log("Delete");
    this.loading = true;
    this.announcementService.deleteAnnouncement(id).subscribe(
      data => {
        console.log("Announcement Deleted");
        this.loading = false;
      })  
  }

  compose() {
    const options: NgbModalOptions = { backdrop: 'static' };
    const modalRef = this.modalService.open(AnnouncementcomposeComponent, options);

    modalRef.result.then((userResponse) => {
      this.getSentAnnouncements();  // Get Announcements.
    });
  }

}
