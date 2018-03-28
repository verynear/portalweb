import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pet-control',
  templateUrl: './pet-formcontrol.component.html',
  styleUrls: ['./pet-formcontrol.component.scss']
})
export class PetFormcontrolComponent {

  constructor() { }

  @Input()
  public index: number;

  @Input()
  public pet: FormGroup;

  @Output()
  public removedPet: EventEmitter<number> = new EventEmitter<number>();

  static buildPet(val: string) {
    return new FormGroup({
      petName: new FormControl(val, Validators.required),
      petBreed: new FormControl(val),
      petAge: new FormControl(val),
      petType: new FormControl(val),
      petColor: new FormControl(val),
      petWeight: new FormControl(val),
    });
  }

}
