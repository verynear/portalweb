import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resident-control',
  templateUrl: './resident-formcontrol.component.html',
  styleUrls: ['./resident-formcontrol.component.scss']
})
export class ResidentFormcontrolComponent {

  constructor() { }

  @Input()
  public index: number;

  @Input()
  public resident: FormGroup;

  @Output()
  public removedResident: EventEmitter<number> = new EventEmitter<number>();

  static buildResident(val: string) {
    return new FormGroup({
      name: new FormControl(val, Validators.required),
      type: new FormControl(val),
      includeInLease: new FormControl(val),
    });
  }

}
