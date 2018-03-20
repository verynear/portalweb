import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attachment } from '../../../models/attachment';

/*
  Attachment-List

  This component displays a list of attachments, vertically as <li> elements.

  Attachment1
  Attachment2
  Attachment3.... View More (X/Y)

  @Param listSize -- The number of items to display before showing "View More" (by default, 3)
  @Param attachements -- An array of attachments.
  @Param output -- The current number shown in list.
*/

 @Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss']
})
export class AttachmentListComponent implements OnInit {

  // An array of attachments.
  @Input('attachments')
  attachments = new Array<Attachment>();

  // The current, and starting size of the attachment list.
  @Input('listSize')
  listSize = 3;

  @Output() currSize = new EventEmitter<number>();

  expandList() {
    if (this.listSize > this.attachments.length) {  // If already showing all items...
      return;
    } else {
      const difference = Math.abs(this.attachments.length - this.listSize);

      if (difference > 10) {
        this.listSize = this.listSize + 10;
      } else {
        this.listSize = this.listSize + difference;
      }
    }

    this.currSize.emit(this.listSize);
  }

  constructor() { }

  ngOnInit() {
    this.currSize.emit(this.listSize);
  }

}
