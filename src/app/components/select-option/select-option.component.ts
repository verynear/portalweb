import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit {
  selectedObj: any;

  @Output() onSelect = new EventEmitter();
  @Input() objs: any[];   /* The array of objects to iterate over */
  @Input() type: any;     /* The type of the value */

  selectValue() {
    this.onSelect.emit(this.selectedObj);
  }

  constructor() { }

  ngOnInit() {
  }

}
