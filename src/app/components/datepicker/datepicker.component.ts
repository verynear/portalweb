import { Component, OnInit } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  model: NgbDateStruct;
  stringDate: string;
  constructor(
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit() {
    this.model = this.setDefaultDate();
    this.onSelectDate(this.model);
  }

  onSelectDate(date: NgbDateStruct) {
    if (date != null) {
            this.model = date;
            this.stringDate = this.ngbDateParserFormatter.format(date);
        }
  }

  setDefaultDate(): NgbDateStruct {
        const startDate = new Date();
        const startYear = startDate.getFullYear().toString();
        const startMonth = startDate.getMonth() + 1;
        const startDay = '1';

        return this.ngbDateParserFormatter.parse(startYear + '-' + startMonth.toString() + '-' + startDay);
}
