import { Component, OnInit } from '@angular/core';
import { Applicant } from '../../models/applicant';
import { ApplicantService } from '../../services/applicant.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.scss']
})
export class LeasingComponent implements OnInit {

  applicant: Applicant = new Applicant();
  selectedApplicant: Applicant;
  newApplicant: boolean;
  applicants: Applicant[];

  constructor(private applicantService: ApplicantService, private alertService: AlertService) { }

  ngOnInit() {
     this.getApplicants();
  }

  getApplicants() {
      this.applicantService.get().subscribe(
      data => {
        console.log('Applicants Loaded');
        this.applicants = data;
        console.log(data[0].lastname);
      },
      error => {
        console.log('Error');
      });
    }

}
