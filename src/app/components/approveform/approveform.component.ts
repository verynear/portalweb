import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../services/applicant.service';
import { Applicant } from '../../models/applicant';
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
    loading = false;
    applicant: any = {};
    message: string;
    errorMessage: string;

  constructor(private service: ApplicantService) { }

  ngOnInit() {
  }

  create() {
    this.message = '';
    this.errorMessage = '';
    const applicant = new Applicant();

    this.loading = true;
    this.service.create(this.applicant)
      .subscribe(
        data => {
          console.log(data);
          this.applicant = data;
          console.log('id');
          // this.approve(data['id']);
          this.loading = true;
          this.message = 'Applicant Created';
        },
        (res: HttpErrorResponse) => {
          this.errorMessage = 'Unable to create new applicant';
          this.loading = false;
        });
    console.log('after with this');
    console.log(this.applicant);
  }

  approve(id: number) {
    this.service.approve(id)
      .subscribe(
      data => {
        this.loading = true;
        this.message = 'Applicant Approved';
        // this.applicant = {};
        },
        (res: HttpErrorResponse) => {
          this.errorMessage = 'Unable to approve resident';
          this.loading = false;
        });
   }
}
