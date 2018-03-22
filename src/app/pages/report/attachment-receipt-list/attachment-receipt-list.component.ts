import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attachment } from '../../../models/attachment';

/*
  Attachment-Receipt-List Component 
  **Displays a list of receipt dates, or 'Not Opened' if the attachment has not been opened.

  @Param attachments -- An array of attachments.
  @Param rowSize -- The number attachments listed as rows.
*/

@Component({
  selector: 'app-attachment-receipt-list',
  templateUrl: './attachment-receipt-list.component.html',
  styleUrls: ['./attachment-receipt-list.component.scss']
})
export class AttachmentReceiptListComponent implements OnInit {

  public notification: string = "Not Opened";

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
