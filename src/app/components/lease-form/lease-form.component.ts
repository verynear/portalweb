import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';
import { Tenant } from '../../models/tenant';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-lease-form',
  templateUrl: './lease-form.component.html',
  styleUrls: ['./lease-form.component.scss']
})
export class LeaseFormComponent implements OnInit {
  leaseForm: FormGroup;
  building: FormControl;
  unit: FormControl;
  name: FormControl;
  applicantType: FormControl;
  includeInLease: FormControl;
  rent: FormControl;
  leaseDate: FormControl;
  duration: FormControl;
  startDate: FormControl;
  endDate: FormControl;
  incentive: FormControl;
  residenceInfo: FormControl;
  deposit: FormControl;
  depositDate: FormControl;
  addendums: FormControl;
  newResident: FormArray;
  newPet: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

    createFormControls() {
        this.building = new FormControl('', Validators.required);
        this.unit = new FormControl('');
        this.name = new FormControl('');
        this.applicantType = new FormControl('');
        this.includeInLease = new FormControl('');
        this.rent = new FormControl('', Validators.required);
        this.leaseDate = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.startDate = new FormControl('', Validators.required);
        this.endDate = new FormControl('', Validators.required);
        this.incentive = new FormControl('', Validators.required);
        this.residenceInfo = new FormControl('');
        this.deposit = new FormControl('', Validators.required);
        this.depositDate = new FormControl('', Validators.required);
        this.addendums = new FormControl('');
        this.newResident = new FormArray([new FormControl('')]);
        this.newPet = new FormArray([new FormControl('')]);
    }

    createForm() {
        this.leaseForm = new FormGroup({
            building: this.building,
            unit: this.unit,
            name: this.name,
            applicantType: this.applicantType,
            includeInLease: this.includeInLease,
            rent: this.rent,
            leaseDate: this.leaseDate,
            duration: this.duration,
            startDate: this.startDate,
            endDate: this.endDate,
            incentive: this.incentive,
            residenceInfo: this.residenceInfo,
            deposit: this.deposit,
            depositDate: this.depositDate,
            addendums: this.addendums,
            newResident: this.newResident,
            newPet: this.newPet
        });
    }

    initNewResident(): FormGroup {
        return this.formBuilder.group({
            name: new FormControl(''),
            type: new FormControl(''),
            includeInLease: new FormControl('')

        });
    }

    addNewResident() {
        const control = <FormArray>this.leaseForm.controls['newResident'];
        control.push(this.initNewResident());
    }

    deleteResident(index: number) {
        const control = <FormArray>this.leaseForm.controls['newResident'];
        control.removeAt(index);
    }

    initNewPet() {
        return this.formBuilder.group({
            itemname: ['']
        });
    }

    addNewPet() {
        const control = <FormArray>this.leaseForm.controls['newPet'];
        control.push(this.initNewPet());
    }

    deletePet(index: number) {
        const control = <FormArray>this.leaseForm.controls['newPet'];
        control.removeAt(index);
    }

}
