import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../services/message.service';
import { SiteService } from '../../services/site.service';
import { Message } from '../../models/message';
import { Building } from '../../models/building';
import { Unit } from '../../models/unit';
import { Site } from '../../models/site';
import { Tenant } from '../../models/tenant';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { SelectItem, EditorModule, AutoCompleteModule, MultiSelectModule } from 'primeng/primeng';
import { ReplacePipe } from '../../pipes/replace.pipe';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  @Output() onSent = new EventEmitter();
  public currentSite: Site;
  buildings: Building[];
  selectedUnits: Unit[];
  selectedTenantUnits: Unit[];
  tenants: SelectItem[];
  fetchedTenants: Tenant[];

  loading = false;
  unitError = false;
  lastLink: any;
  recips: any[];
  checkedList: any[];
  filtered = [];
  finalBuildingIds = [];
  finalBuildingUnitIds = [];
  indi: {};

  unitErrorNumber: string;
  unitIdForTenant: number;
  newMessageId: number;

  composeForm: FormGroup;
  type: FormControl;
  buildingIdforUnit: FormControl;
  buildingIdforTenantUnit: FormControl;
  rentalsiteBuildingIds: FormControl;
  rentalsiteBuildingUnitIds: FormControl;
  tenantIds: FormControl;
  messageType: FormControl;
  subject: FormControl;
  message: FormControl;

    constructor(private router: Router, public activeModal: NgbActiveModal, private messageService:
      MessageService, private alertService: AlertService, private siteService: SiteService) {}

    ngOnInit() {
        this.siteService.getCurrentSite().subscribe(site => {
          this.currentSite = site;
        });
        this.unitError = false;
        this.recips = [
          {type: 'SITE', name: 'Community', community: this.currentSite.name},
          {type: 'BUILDING', name: 'Building(s)'},
          {type: 'UNIT', name: 'Unit(s)'},
          {type: 'RESIDENT', name: 'Resident(s)'}
        ];
        this.finalBuildingUnitIds = [];
        this.getSiteBuildings();
        this.createFormControls();
        this.createForm();
        this.setDefaultValues();
    }
    // Retrieves Site Buildings to populate first dropdown
    getSiteBuildings() {
    this.siteService.getBuildings(this.currentSite.id).subscribe(
      data => {
        this.buildings = data;
      },
      error => {
        this.alertService.error('error retrieving site buildings');
      });
    }
    // sets radio button
    setDefaultValues() {
       this.composeForm.patchValue({messageType: 'STANDARD'});
    }

    createFormControls() {
        this.type = new FormControl('', Validators.required);
        this.rentalsiteBuildingIds = new FormControl('');
        this.rentalsiteBuildingUnitIds = new FormControl('');
        this.buildingIdforUnit = new FormControl('');
        this.buildingIdforTenantUnit = new FormControl('');
        this.tenantIds = new FormControl('');
        this.messageType = new FormControl('', Validators.required);
        this.subject = new FormControl('', Validators.required);
        this.message = new FormControl('', Validators.required);
    }

    createForm() {
        this.composeForm = new FormGroup({
            type: this.type,
            rentalsiteBuildingIds: this.rentalsiteBuildingIds,
            rentalsiteBuildingUnitIds: this.rentalsiteBuildingUnitIds,
            buildingIdforUnit: this.buildingIdforUnit,
            buildingIdforTenantUnit: this.buildingIdforTenantUnit,
            tenantIds: this.tenantIds,
            messageType: this.messageType,
            subject: this.subject,
            message: this.message
        });
    }
    // for sending to units
    getUnitsForBuilding(event) {
      const query = event.query;
      this.siteService.getUnitsByBuildingId(this.composeForm.value.buildingIdforUnit).then(units => {
       this.selectedUnits = this.filterUnit(query, units);
       });
    }
    // for sending to resident
    getUnitsForBuildingTenant(event) {
      const query = event.query;
      this.siteService.getUnitsByBuildingId(this.composeForm.value.buildingIdforTenantUnit).then(units => {
       this.selectedTenantUnits = this.filterUnit(query, units);
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
    // autocomplete filtering
    filterUnit(query, units: any[]): any[] {
        this.filtered = [];
        for (let i = 0; i < units.length; i++) {
            const unit = units[i];
            if (unit.hasTenant) {
              // accepts the query as user types and returns matching results as suggestions
              if (unit.unitNumber.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                  this.filtered.push(unit);
                  console.log('filtered units');
                  console.log(this.filtered);
              }
            } else {
              console.log('error');
            }
        }
        return this.filtered;
    }

    // for sending to units
    addUnit(value) {
      this.finalBuildingUnitIds.push(value.id);
    }
    // reset form error label
    resetUnit() {
      this.unitError = false;
    }
    // for sending to residents
    setUnit(value) {
      this.unitIdForTenant = value.id;
      this.siteService.getTenantsByUnitId(this.unitIdForTenant).subscribe(
      data => {
        this.fetchedTenants = data;
        this.tenants = [];
        for (const tenant of this.fetchedTenants) {
            this.tenants.push({label: tenant.firstname + ' ' + tenant.lastname, value: tenant.id});
        }
      },
      error => {
        this.tenants = [{label: 'no matching residents - send to selected unit', value: null }];
        this.unitError = true;
        this.unitErrorNumber = value.unitNumber;
        console.log(error);
      });
    }

    build() {
        this.loading = true;
        const message = new Message();

        message.type = this.composeForm.value.type;
        if (this.composeForm.value.type === 'SITE') {
          message.rentalsitesId = this.currentSite.id;
        }
        for (const building of this.composeForm.value.rentalsiteBuildingIds) {
          this.finalBuildingIds.push(building.id);
        }
        if (this.composeForm.value.type === 'BUILDING') {
          message.rentalsiteBuildingIds = this.finalBuildingIds;
        }
        if (this.composeForm.value.type === 'UNIT') {
          message.rentalsiteBuildingUnitIds = this.finalBuildingUnitIds;
        }
        if (this.composeForm.value.type === 'RESIDENT') {
          message.rentalsiteBuildingIds = [Number (this.composeForm.value.buildingIdforTenantUnit)];
          message.tenantIds = this.composeForm.value.tenantIds;
        }
        if (message.tenantIds && message.tenantIds.length === 1 && message.tenantIds.pop() === null) {
          this.composeForm.value.type = 'UNIT';
          message.type = 'UNIT';
          message.rentalsiteBuildingUnitIds = [Number (this.unitIdForTenant)];
        }
        if (message.type === 'RESIDENT' && message.tenantIds && message.tenantIds.length === 0) {
          this.composeForm.value.type = 'UNIT';
          message.type = 'UNIT';
          message.rentalsiteBuildingUnitIds = [Number (this.unitIdForTenant)];
        }
        message.messageType = this.composeForm.value.messageType;
        message.message = this.composeForm.value.message;
        message.subject = this.composeForm.value.subject;

        console.log(message);

        message.message = new ReplacePipe().transform(message.message, '<br>'); // Remove all occurences of <br>
        this.send(message);

      }
    send(message) {
        this.messageService.sendMessage(message).subscribe(
            data => {
                console.log('sent');
                this.newMessageId = data['id'];
                this.lastLink = '/messages/view/' + this.newMessageId;
                this.alertService.success('Your message has been sent', this.lastLink, true);
                // this.messageService.onSent(); if enabled - refesh sentBox after message sent
            },
            error => {
                this.alertService.error('Message Failed to Send');
                this.loading = false;
            });
    }

}
