import { Component, OnInit } from '@angular/core';
import { Applicant } from '../../models/applicant';
import { ApplicantService } from '../../services/applicant.service';
import { AlertService } from '../../services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GuestcardComponent } from '../../components/guestcard/guestcard.component';

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

  constructor(private applicantService: ApplicantService, private alertService: AlertService, private modalService: NgbModal) { }

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

  openCard(applicant) {
    const modalRef = this.modalService.open(GuestcardComponent, { windowClass: 'dark-modal' });
    modalRef.componentInstance.name = applicant.firstname + ' ' + applicant.lastname;
    modalRef.componentInstance.phone = applicant.phone;
    modalRef.componentInstance.moveinDate = applicant.moveinDate;
  }

  // For sort event./
  onSorted($event) {
    this.applicants = this.applicantService.sortApplicants(this.applicants, $event);
  }

}
