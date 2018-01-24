import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { Building } from '../../models/building';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { EditorModule, AutoCompleteModule, MultiSelectModule } from 'primeng/primeng';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  @Output() onVoted = new EventEmitter<boolean>();
  sent = false;
  buildings: Building[];
  selectedBuildings: Building[];
  loading = false;
  recips = [
    {type: 'SITE', name: 'Community'},
    {type: 'BUILDING', name: 'Building(s)'},
    {type: 'UNIT', name: 'Unit(s)'},
    {type: 'UNIT', name: 'Resident(s)'}
  ];
  list: any[];
  checkedList: any[];
  indi: {};
  composeForm: FormGroup;
  type: FormControl;
  rentalsitesId: number;
  rentalsiteBuildingIds: FormControl;
  rentalsiteBuildingUnitIds: FormControl;
  tenantIds: FormControl;
  finalBuildingIds: any[];
  finalBuildingUnitIds: any[];
  finaltenantIds: any[];
  messageType: FormControl;
  subject: FormControl;
  message: FormControl;
  public currentSiteId: number;


    constructor(private router: Router, public activeModal: NgbActiveModal, private messageService:
      MessageService, private alertService: AlertService, private userService: UserService) {}

    ngOnInit() {
        this.currentSiteId = Number (localStorage.getItem('currentSiteId'));
        this.getSiteBuildings();
        this.createFormControls();
        this.createForm();
    }

    getSiteBuildings() {
    this.messageService.getbuildings(this.currentSiteId).subscribe(
      data => {
        this.buildings = data;
      },
      error => {
        console.log('Error');
      });
    }

    createFormControls() {
        this.type = new FormControl('', Validators.required);
        this.rentalsiteBuildingIds = new FormControl('');
        this.rentalsiteBuildingUnitIds = new FormControl('');
        this.messageType = new FormControl('', Validators.required);
        this.subject = new FormControl('');
        this.message = new FormControl('', Validators.required);
    }

    createForm() {
        this.composeForm = new FormGroup({
            type: this.type,
            rentalsiteBuildingIds: this.rentalsiteBuildingIds,
            rentalsiteBuildingUnitId: this.rentalsiteBuildingUnitIds,
            messageType: this.messageType,
            subject: this.subject,
            message: this.message
        });
    }

    shareCheckedList(item: any[]) {
        this.checkedList = item;
        console.log(item);
    }
    shareIndividualCheckedList(item: {}) {
        this.indi = item;
        console.log(item);
    }

    send() {
        this.loading = true;
        const message = new Message();

        message.type = this.composeForm.value.type;
        if (message.type === 'SITE') {message.rentalsitesId = this.currentSiteId; }
        if (message.type === 'BUILDING') {message.rentalsiteBuildingIds = this.parseIds(this.composeForm.value.rentalsiteBuildingIds); }
        message.messageType = this.composeForm.value.messageType;
        message.message = this.composeForm.value.message;
        message.subject = this.composeForm.value.subject;
        console.log(message);

        this.messageService.sendMessage(message).subscribe(
            data => {
                console.log('sent');
                this.alertService.success('Message Sent', true);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    parseIds(formValues: Array<any>) {
      for (const formValue of formValues) {
         this.finalBuildingIds.push(formValue.id);
      }
      return this.finalBuildingIds;
    }

}
