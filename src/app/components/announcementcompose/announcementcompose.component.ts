import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { Building } from '../../models/building';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { MultiSelectModule } from 'primeng/primeng';
import { HttpErrorResponse } from '@angular/common/http';
import { EditorModule } from 'primeng/primeng';

@Component({
  selector: 'app-announcementcompose',
  templateUrl: './announcementcompose.component.html',
  styleUrls: ['./announcementcompose.component.scss']
})
export class AnnouncementcomposeComponent implements OnInit {
  loading = false;
  list: any[];
  buildings: Building[];
  selectedBuildings: Building[];
  indi: {};
  announcementForm: FormGroup;
  rentalsiteBuildingId: FormControl;
  subject: FormControl;
  message: FormControl;

  constructor(private router: Router, public activeModal: NgbActiveModal, private messageService:
      MessageService, private alertService: AlertService) {}

    ngOnInit() {
        this.getSiteBuildings();
        this.createFormControls();
        this.createForm();
    }

    getSiteBuildings() {
    this.messageService.getbuildings().subscribe(
      data => {
        this.buildings = data;
      },
      error => {
        console.log('Error');
      });
    }

    createFormControls() {
        this.rentalsiteBuildingId = new FormControl('');
        this.subject = new FormControl('');
        this.message = new FormControl('', Validators.required);
    }

    createForm() {
        this.announcementForm = new FormGroup({
            rentalsiteBuildingId: this.rentalsiteBuildingId,
            subject: this.subject,
            message: this.message
        });
    }

    send() {
        this.loading = true;
        const message = new Message();

        message.type = 'BUILDING';
        message.rentalsiteBuildingId = this.announcementForm.value.rentalsiteBuildingId[0]['id'];
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
