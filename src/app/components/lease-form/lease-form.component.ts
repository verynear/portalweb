import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';
import { Tenant } from '../../models/tenant';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { ResidentFormarrayComponent } from './resident-formarray/resident-formarray.component';
import { PetFormarrayComponent } from './pet-formarray/pet-formarray.component';


@Component({
  selector: 'app-lease-form',
  templateUrl: './lease-form.component.html',
  styleUrls: ['./lease-form.component.scss']
})
export class LeaseFormComponent implements OnInit {
  leaseForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

    createForm() {
        this.leaseForm = this.formBuilder.group({
            building: ['', Validators.required],
            unit: ['', Validators.required],
            name: ['', Validators.required],
            applicantType: ['', Validators.required],
            includeInLease: ['', Validators.required],
            rent: ['', Validators.required],
            leaseDate: ['', Validators.required],
            duration: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            incentive: ['', Validators.required],
            residenceInfo: ['', Validators.required],
            deposit: ['', Validators.required],
            depositDate: ['', Validators.required],
            addendums: ['', Validators.required],
            residents: ResidentFormarrayComponent.buildResidents(),
            pets: PetFormarrayComponent.buildPets()
        });
    }

}
