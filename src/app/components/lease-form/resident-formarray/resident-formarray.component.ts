import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { ResidentFormcontrolComponent } from './../resident-formcontrol/resident-formcontrol.component';

@Component({
  selector: 'app-resident-array',
  templateUrl: './resident-formarray.component.html',
  styleUrls: ['./resident-formarray.component.scss']
})
export class ResidentFormarrayComponent {

  constructor() { }

  @Input()
  public residentFormArray: FormArray;

  static buildResidents() {
    return new FormArray(
        [ResidentFormcontrolComponent.buildResident('')]
    );
  }

  addResident() {
    this.residentFormArray.push(ResidentFormcontrolComponent.buildResident(''));
  }

}
