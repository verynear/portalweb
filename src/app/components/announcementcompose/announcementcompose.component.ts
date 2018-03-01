import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReplacePipe } from '../../pipes/replace.pipe';
import { Site } from '../../models/site';
import { User } from '../../models/user';
import { Announcement } from '../../models/announcement';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { SiteService } from '../../services/site.service';
import { AlertService } from '../../services/alert.service';
import { AnnouncementService } from '../../services/announcement.service';
import { MessageService } from '../../services/message.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from 'primeng/primeng';

@Component({
  selector: 'app-announcementcompose',
  templateUrl: './announcementcompose.component.html',
  styleUrls: ['./announcementcompose.component.scss']
})
export class AnnouncementcomposeComponent implements OnInit {
  loading = false;
  list: any[];
  announcementForm: FormGroup;
  rentalsitesId: number;
  subject: FormControl;
  message: FormControl;
  currentSite: Site;
  currentUser: User;

  constructor(private router: Router, public activeModal: NgbActiveModal,
    public announcementService: AnnouncementService, private siteService: SiteService
    , private sessionService: SessionService, private alertService: AlertService) {}

    ngOnInit() {
        this.createFormControls();
        this.createForm();

        this.siteService.getCurrentSite().subscribe(site => {
            this.currentSite = site;
        });

        this.sessionService.getObservable('currentUser').subscribe(user => {
            this.currentUser = user;
        });
    }

    createFormControls() {
        this.subject = new FormControl('', Validators.required);
        this.message = new FormControl('', Validators.required);
    }

    createForm() {
        this.announcementForm = new FormGroup({
            subject: this.subject,
            message: this.message
        });
    }

    getAnnouncement() {

    }

    build() {
        const announcement = new Announcement();

        announcement.type = 'SITE';
        announcement.rentalsitesId = this.currentSite.id;
        announcement.message = this.announcementForm.value.message;
        announcement.subject = this.announcementForm.value.subject;
        announcement.messageType = 'Announcement';

        announcement.message = new ReplacePipe().transform(announcement.message, '<br>'); // Remove all occurences of <br>
        this.send(announcement);
    }
    send(announcement) {
        this.announcementService.postAnnouncement(announcement).subscribe(
            data => {
                this.activeModal.close('success');
                this.alertService.success('Announcement Sent');
                this.loading = false;
            },
            error => {
                this.activeModal.close('failure');
                this.alertService.error('Announcement Failed to Send');
                this.loading = false;
        });
    }


    /*
        TODO: Edit an Announcement.
    */
    edit(announcement: Announcement) {



    }


}
