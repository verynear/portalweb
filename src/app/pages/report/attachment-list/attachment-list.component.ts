import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss']
})
export class AttachmentListComponent implements OnInit {
  @Input('attachments')
  attachments = new Array();

  constructor() { }

  ngOnInit() {
  }

}
