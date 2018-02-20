import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from '../../services/message.service';
import { AnnouncementService } from '../../services/announcement.service';
import { AlertService } from '../../services/alert.service';

import { Announcement } from '../../models/announcement';


import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule, ProgressSpinnerModule } from 'primeng/primeng';

import { ReplacePipe } from '../../pipes/replace.pipe';

import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';

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
    public announcementService: AnnouncementService, private siteService: SiteService, private sessionService: SessionService, private alertService: AlertService) {}

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

    send() {
        const message = new Announcement();
        message.type = 'SITE';
        message.rentalsitesId = 1;
        message.message = this.announcementForm.value.message;
        message.subject = this.announcementForm.value.subject;
        message.messageType = 'Announcement';

        message.message = new ReplacePipe().transform(message.message, '<br>'); // Remove all occurences of <br>

        this.announcementService.postAnnouncement(message).subscribe(
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


    edit(announcement: Announcement) {



    }


}
