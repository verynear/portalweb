import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { EditorModule } from 'primeng/primeng';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  loading = false;
  recips: string[] = [
    'Building(s)',
    'Unit(s)',
    'Renter(s)',
  ];
  buildings: string[] = [
    'All',
    'Building 1',
    'Building 2',
    'Building 3',
    'Building 4'
  ];
  messagetypes: string[] = [
    'Standard',
    'Announcement',
    'Alert - Standard',
    'Alert - Urgent'
  ];
  composeForm: FormGroup;
  recipientType: FormControl;
  emailBuilding: FormControl;
  email: FormControl;
  messageType: FormControl;
  subject: FormControl;
  message: FormControl;


    constructor(private router: Router, public activeModal: NgbActiveModal, private messageService:
      MessageService, private alertService: AlertService) {}

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.type = new FormControl('', Validators.required);
        this.rentalsitesId = new FormControl('', Validators.required);
        this.rentalsiteBuildingId = new FormControl('');
        this.rentalsiteBuildingUnitId = new FormControl('');
        this.messageType = new FormControl('', Validators.required);
        this.subject = new FormControl('');
        this.message = new FormControl('', Validators.required);
    }

    createForm() {
        this.composeForm = new FormGroup({
            type: this.type,
            rentalsitesId: this.rentalsitesId,
            email: this.email,
            messageType: this.messageType,
            subject: this.subject,
            message: this.message
        });
    }

    send() {
        this.loading = true;
        const message = new Message();

        message.type = this.composeForm.value.type;
        message.rentalsitesId = this.composeForm.value.lastName;
        message.message = this.composeForm.value.message;
        message.password = this.composeForm.value.password;

        this.messageService.create(message).subscribe(
            data => {
                this.alertService.success('Message Sent', true);
                this.router.navigate(['/messages/sent']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

}
