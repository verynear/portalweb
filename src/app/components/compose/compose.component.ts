import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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


    constructor(public activeModal: NgbActiveModal, private messageService: MessageService) {}

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.recipientType = new FormControl('', Validators.required);
        this.emailBuilding = new FormControl('', Validators.required);
        this.email = new FormControl('', Validators.required);
        this.messageType = new FormControl('', Validators.required);
        this.subject = new FormControl('');
        this.message = new FormControl('', Validators.required);
    }

    createForm() {
        this.composeForm = new FormGroup({
            recipientType: this.recipientType,
            emailBuilding: this.emailBuilding,
            email: this.email,
            messageType: this.messageType,
            subject: this.subject,
            message: this.message
        });
    }

    // send() {
    //     this.loading = true;
    //     const user = new User();

    //     user.firstname = this.registerForm.value.firstName;
    //     user.lastname = this.registerForm.value.lastName;
    //     user.username = this.registerForm.value.email;
    //     user.password = this.registerForm.value.password;

    //     this.userService.create(user).subscribe(
    //         data => {
    //             this.alertService.success('Registration successful', true);
    //             this.router.navigate(['/login']);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });
    // }

}
