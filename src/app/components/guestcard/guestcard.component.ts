import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';
import { Tenant } from '../../models/tenant';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-guestcard',
  templateUrl: './guestcard.component.html',
  styleUrls: ['./guestcard.component.scss']
})
export class GuestcardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
