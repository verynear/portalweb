import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent {
    @Input() list: any[];
    @Output() shareCheckedList = new EventEmitter();
    @Output() shareIndividualCheckedList = new EventEmitter();
    checkedList: any[];
    currentSelected: {};

    constructor() {
        this.checkedList = [];
    }

    getSelectedValue(status: Boolean, value: String) {
        if (status) {
          this.checkedList.push(value);
        }else {
            const index = this.checkedList.indexOf(value);
            this.checkedList.splice(index, 1);
        }
        this.currentSelected = {checked: status, name: value};

        // share checked list
        this.shareCheckedlist();
        console.log(this.checkedList);
        // share individual selected item
        this.shareIndividualStatus();
    }
    shareCheckedlist() {
         this.shareCheckedList.emit(this.checkedList);
    }
    shareIndividualStatus() {
        this.shareIndividualCheckedList.emit(this.currentSelected);
    }

}
