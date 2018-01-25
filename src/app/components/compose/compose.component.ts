import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';
import { Building } from '../../models/building';
import { Unit } from '../../models/unit';
import { Tenant } from '../../models/tenant';
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
  @Output() onSent = new EventEmitter<boolean>();
  sent = false;
  buildings: Building[];
  selectedBuildings: Building[];
  units: any[];
  selectedUnits: any[];
  tenant: any;
  tenants: any[];
  selectedTenants: any[];
  loading = false;
  recips = [
    {type: 'SITE', name: 'Community'},
    {type: 'BUILDING', name: 'Building(s)'},
    {type: 'UNIT', name: 'Unit(s)'},
    {type: 'TENANT', name: 'Resident(s)'}
  ];
  list: any[];
  checkedList: any[];
  indi: {};
  composeForm: FormGroup;
  type: FormControl;
  rentalsitesId: number;
  buildingIdforUnit: FormControl;
  rentalsiteBuildingIds: FormControl;
  rentalsiteBuildingUnitIds: FormControl;
  unitIdForTenant: any;
  tenantIds: FormControl;
  filtered = [];
  finalBuildingIds = [];
  finalBuildingUnitIds = [];
  finaltenantIds = [];
  messageType: FormControl;
  subject: FormControl;
  message: FormControl;
  public currentSiteId: number;


    constructor(private router: Router, public activeModal: NgbActiveModal, private messageService:
      MessageService, private alertService: AlertService, private userService: UserService) {}

    ngOnInit() {
        this.currentSiteId = Number (localStorage.getItem('currentSiteId'));
        this.finalBuildingUnitIds = [];
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

    getUnitsForBuilding(event) {
      const query = event.query;
      this.messageService.getUnitsByBuildingId(this.composeForm.value.buildingIdforUnit).then(units => {
       this.selectedUnits = this.filterUnit(query, units);
       });
      console.log('selected units');
      console.log(this.selectedUnits);
      console.log('just units');
      console.log(this.units);
    }

    getTenantsForUnit(event) {
      const query = event.query;
      this.messageService.getTenantsByUnitId(this.unitIdForTenant).then(tenants => {
       this.selectedTenants = this.filterTenant(query, tenants);
       });
      console.log('selected tenants');
      console.log(this.selectedTenants);
      console.log('just units');
      console.log(this.tenants);
    }

    createFormControls() {
        this.type = new FormControl('', Validators.required);
        this.rentalsiteBuildingIds = new FormControl('');
        this.rentalsiteBuildingUnitIds = new FormControl('');
        this.buildingIdforUnit = new FormControl('');
        this.tenantIds = new FormControl('');
        this.messageType = new FormControl('', Validators.required);
        this.subject = new FormControl('');
        this.message = new FormControl('', Validators.required);
    }

    createForm() {
        this.composeForm = new FormGroup({
            type: this.type,
            rentalsiteBuildingIds: this.rentalsiteBuildingIds,
            rentalsiteBuildingUnitIds: this.rentalsiteBuildingUnitIds,
            buildingIdforUnit: this.buildingIdforUnit,
            tenantIds: this.tenantIds,
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

    filterUnit(query, units: any[]): any[] {
        this.filtered = [];
        for (let i = 0; i < units.length; i++) {
            const unit = units[i];
            if (unit.unitNumber.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                this.filtered.push(unit);
                console.log('filtered');
                console.log(this.filtered);
            }
        }
        return this.filtered;
    }

    filterTenant(query, tenants: any[]): any[] {
        this.filtered = [];
        for (let i = 0; i < tenants.length; i++) {
            const tenant = tenants[i];
             if (tenant.lastname.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                this.filtered.push(tenant);
                console.log('filtered');
                console.log(this.filtered);
            }
        }
        return this.filtered;
    }

    addUnit(value) {
      console.log('selected');
      console.log(value);
      this.finalBuildingUnitIds.push(value.id);
    }

    setUnit(value) {
      this.unitIdForTenant = value.id;
    }

    addTenant(value) {
      console.log('selected');
      console.log(value);
      this.finaltenantIds.push(value.id);
    }


    send() {
        this.loading = true;
        const message = new Message();

        if (this.composeForm.value.type === 'SITE' || this.composeForm.value.type ===
          'BUILDING' || this.composeForm.value.type === 'UNIT') { message.type =
          this.composeForm.value.type; } else { message.type = 'UNIT'; }
        if (this.composeForm.value.type === 'SITE') {message.rentalsitesId = this.currentSiteId; }
        for (const building of this.composeForm.value.rentalsiteBuildingIds) {
          this.finalBuildingIds.push(building.id);
        }
        if (this.composeForm.value.type === 'BUILDING') {message.rentalsiteBuildingIds = this.finalBuildingIds; }
        // for (const unit of this.selectedUnits) {
        //   this.finalBuildingUnitIds.push(unit.id);
        // }
        if (this.composeForm.value.type === 'UNIT') {message.rentalsiteBuildingUnitIds = this.finalBuildingUnitIds; }
        if (this.composeForm.value.type === 'TENANT') {message.rentalsiteBuildingUnitIds = this.unitIdForTenant;
          message.tenantIds = this.finaltenantIds; }
        message.messageType = this.composeForm.value.messageType;
        message.message = this.composeForm.value.message;
        message.subject = this.composeForm.value.subject;
        console.log(message);

        this.messageService.sendMessage(message).subscribe(
            data => {
                console.log('sent');
                this.alertService.success('Message Sent', true);
                window.location.reload();
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

}
