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

  constructor(private alertService: AlertService,
    private service: ApplicantService) { }

  ngOnInit() {
  }

  create(form) {
    const applicant = new Applicant();

    this.loading = true;
    this.service.create(this.applicant)
      .subscribe(
        data => {
          this.applicant = data;
          console.log('new applicant id');
          console.log(data['id']);
          this.approve(data['id']);
          this.loading = true;
          this.alertService.success('Applicant Created');
          form.resetForm();
        },
        (res: HttpErrorResponse) => {
          this.alertService.error('Unable to create new applicant');
          this.loading = true;
        });
  }

  approve(id: number) {
    this.service.approve(id)
      .subscribe(
      data => {
        this.loading = false;
        this.alertService.success('Applicant Approved');
        // this.applicant = {};
        },
        (res: HttpErrorResponse) => {
          this.alertService.error('Unable to approve resident');
          this.loading = false;
        });
   }
}
