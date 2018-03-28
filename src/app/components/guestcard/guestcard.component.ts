import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';
import { Tenant } from '../../models/tenant';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Applicant } from '../../models/applicant';
import { ApplicantService } from '../../services/applicant.service';

@Component({
  selector: 'app-guestcard',
  templateUrl: './guestcard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./guestcard.component.scss']
})
export class GuestcardComponent implements OnInit {
  @Input() name;
  @Input() phone;
  @Input() moveinDate;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
