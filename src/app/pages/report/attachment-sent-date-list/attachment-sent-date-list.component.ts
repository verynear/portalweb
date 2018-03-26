import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attachment } from '../../../models/attachment';


@Component({
  selector: 'app-attachment-sent-date-list',
  templateUrl: './attachment-sent-date-list.component.html',
  styleUrls: ['./attachment-sent-date-list.component.scss']
})
export class AttachmentSentDateListComponent implements OnInit {

  // An array of attachments.
  @Input('attachments')
  attachments = new Array<Attachment>();

  // The number of rows for the attachments.
  @Input('rowSize')
  rowSize = 3;

  constructor() { }

  ngOnInit() {

  }

}
