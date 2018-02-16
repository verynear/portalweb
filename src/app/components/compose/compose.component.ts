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
  units: Unit[];
  selectedUnits: Unit[];
  selectedTenantUnits: Unit[];
  tenants: SelectItem[];
  selectedTenants: Tenant[];
  fetchedTenants: Tenant[];
  loading = false;
  recips = [
    {type: 'SITE', name: 'Community'},
    {type: 'BUILDING', name: 'Building(s)'},
    {type: 'UNIT', name: 'Unit(s)'},
    {type: 'RESIDENT', name: 'Resident(s)'}
  ];
  checkedList: any[];
  indi: {};
  composeForm: FormGroup;
  type: FormControl;
  buildingIdforUnit: FormControl;
  buildingIdforTenantUnit: FormControl;
  rentalsiteBuildingIds: FormControl;
  rentalsiteBuildingUnitIds: FormControl;
  unitIdForTenant: number;
  tenantIds: FormControl;
  filtered = [];
  finalBuildingIds = [];
  finalBuildingUnitIds = [];
  messageType: FormControl;
  subject: FormControl;
  message: FormControl;

    constructor(private router: Router, public activeModal: NgbActiveModal, private messageService:
      MessageService, private alertService: AlertService, private siteService: SiteService) {}

    ngOnInit() {
        this.siteService.getCurrentSite().subscribe(site => {
          this.currentSite = site;
        });

        this.finalBuildingUnitIds = [];
        this.getSiteBuildings();
        this.createFormControls();
        this.createForm();
        this.setDefaultValues();
    }

    getSiteBuildings() {
    this.siteService.getBuildings(this.currentSite.id).subscribe(
      data => {
        this.buildings = data;
      },
      error => {
        console.log('Error');
      });
    }

    getUnitsForBuilding(event) {
      const query = event.query;
      this.siteService.getUnitsByBuildingId(this.composeForm.value.buildingIdforUnit).then(units => {
       this.selectedUnits = this.filterUnit(query, units);
       });
      console.log('selected units');
      console.log(this.selectedUnits);
      console.log('just units');
      console.log(this.units);
    }

    getUnitsForBuildingTenant(event) {
      const query = event.query;
      this.siteService.getUnitsByBuildingId(this.composeForm.value.buildingIdforTenantUnit).then(units => {
       this.selectedTenantUnits = this.filterUnit(query, units);
       });
      console.log('selected tenant units');
      console.log(this.selectedTenantUnits);
      console.log('just units');
      console.log(this.units);
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

    shareCheckedList(item: any[]) {
        this.checkedList = item;
        console.log(item);
    }
    shareIndividualCheckedList(item: {}) {
        this.indi = item;
        console.log(item);
    }

    setDefaultValues() {
       this.composeForm.patchValue({messageType: 'STANDARD'});
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


    addUnit(value) {
      console.log('selected');
      console.log(value);
      this.finalBuildingUnitIds.push(value.id);
    }

    setUnit(value) {
      this.unitIdForTenant = value.id;
      console.log('unitIdforTenant');
      console.log(this.unitIdForTenant);
      this.siteService.getTenantsByUnitId(this.unitIdForTenant).subscribe(
      data => {
        this.fetchedTenants = data;
        this.tenants = [];
        for (const tenant of this.fetchedTenants) {
            this.tenants.push({label: tenant.firstname + ' ' + tenant.lastname, value: tenant.id});
        }
        console.log('selectItem formatted tenants');
        console.log(this.tenants);
      },
      error => {
        console.log('Error');
      });
    }

    send() {
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
        message.messageType = this.composeForm.value.messageType;
        message.message = this.composeForm.value.message;
        message.subject = this.composeForm.value.subject;
        console.log(message);

        message.message = new ReplacePipe().transform(message.message, '<br>'); // Remove all occurences of <br>

        this.messageService.sendMessage(message).subscribe(
            data => {
                console.log('sent');
                this.alertService.success('Message Sent', true);
                this.messageService.onSent();
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

}
