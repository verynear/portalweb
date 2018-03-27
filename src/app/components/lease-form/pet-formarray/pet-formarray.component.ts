import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { PetFormcontrolComponent } from './../pet-formcontrol/pet-formcontrol.component';

@Component({
  selector: 'app-pet-array',
  templateUrl: './pet-formarray.component.html',
  styleUrls: ['./pet-formarray.component.scss']
})
export class PetFormarrayComponent {

  constructor() { }

  @Input()
  public petFormArray: FormArray;

  static buildPets() {
    return new FormArray(
        []
    );
  }

  addPet() {
    this.petFormArray.push(PetFormcontrolComponent.buildPet(''));
  }

}
