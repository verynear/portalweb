import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { AnnouncementService } from '../../services/announcement.service';

import { Announcement } from '../../models/announcement';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule, ProgressSpinnerModule } from 'primeng/primeng';

import { ReplacePipe } from '../../pipes/replace.pipe';

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

  constructor(private router: Router, public activeModal: NgbActiveModal, private userService: UserService,
    public announcementService: AnnouncementService) {}

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.subject = new FormControl('');
        this.message = new FormControl('', Validators.required);
    }

    createForm() {
        this.announcementForm = new FormGroup({
            subject: this.subject,
            message: this.message
        });
    }

    send() {
        this.loading = true;
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
                this.loading = false;
            },
            error => {
                this.activeModal.close('failure');
                this.loading = false;
        });

    }
}
