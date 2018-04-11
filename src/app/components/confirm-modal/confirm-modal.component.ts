import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
/*
  Confirm Modal.
*/
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  // TODO: Make dynamic body for alternate body messages.
  @Input('body')
  public body = '';

  confirm() {
    this.activeModal.close('success');
  }

  cancel() {
    this.activeModal.close('cancel');
  }

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
