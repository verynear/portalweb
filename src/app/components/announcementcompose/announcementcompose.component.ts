import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { Message } from '../../models/message';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { MultiSelectModule, EditorModule } from 'primeng/primeng';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-announcementcompose',
  templateUrl: './announcementcompose.component.html',
  styleUrls: ['./announcementcompose.component.scss']
})
export class AnnouncementcomposeComponent implements OnInit {
  loading = false;
  list: any[];
  indi: {};
  announcementForm: FormGroup;
  rentalsitesId: number;
  subject: FormControl;
  message: FormControl;

  constructor(private router: Router, public activeModal: NgbActiveModal, private messageService:
      MessageService, private alertService: AlertService, private userService: UserService) {}

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
        const message = new Message();

        message.type = 'SITE';
        message.rentalsitesId = this.userService.getCurrentSiteId();
        message.message = this.announcementForm.value.message;
        message.subject = this.announcementForm.value.subject;
        message.messageType = 'Announcement';
        console.log(message);

        this.messageService.sendMessage(message).subscribe(
            data => {
                this.alertService.success('Announcement Sent', true);
                this.router.navigate(['/announcements']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

}
