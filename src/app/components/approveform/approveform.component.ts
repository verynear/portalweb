import { Component, OnInit } from '@angular/core';
import { Applicant } from '../../models/applicant';
import { ApplicantService } from '../../services/applicant.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-approveform',
  templateUrl: './approveform.component.html',
  styleUrls: ['./approveform.component.scss']
})
export class ApproveformComponent implements OnInit {
    model: any = {};
    loading = false;
    message: string;
    errorMessage: string;

  constructor(private service: ApplicantService) { }

  ngOnInit() {
  }

  approve() {
    this.message = '';
    this.errorMessage = '';

    this.loading = true;
    this.service.create(this.model)
      .subscribe(
        data => {
          this.loading = true;
          this.message = 'Applicant Created';
        },
        (res: HttpErrorResponse) => {
          this.errorMessage = 'Unable to create new applicant';
          this.loading = false;
        });
    this.service.approve(this.model)
      .subscribe(
      data => {
        this.loading = true;
        this.message = 'Applicant Approved';
        this.model = {};
        },
        (res: HttpErrorResponse) => {
          this.errorMessage = 'Unable to approve resident';
          this.loading = false;
        });
  }

}
