import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent implements OnInit {
  selectAll: number;
  @Output() onSelect = new EventEmitter();

  @Input() selected: any;
  @Input() objs: any[];       /* The array of objects to iterate over */
  @Input() type: string;      /* The type of the value */
  @Input() default: string;   /* Default message for select */

  selectValue() {
    this.onSelect.emit(this.selected);
  }

  constructor() { }

  ngOnInit() {
    this.selectAll = 0;
  }
}
