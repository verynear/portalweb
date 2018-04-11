import { Component, OnInit } from '@angular/core';
import { Applicant, ApplicantTest } from '../../models/applicant';
import { ApplicantService } from '../../services/applicant.service';
import { AlertService } from '../../services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GuestcardComponent } from '../../components/guestcard/guestcard.component';
import { ApproveformComponent } from '../../components/approveform/approveform.component';

@Component({
  selector: 'app-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.scss']
})
export class LeasingComponent implements OnInit {

  applicant: Applicant = new Applicant();
  selectedApplicant: Applicant;
  applicants: ApplicantTest[];
  loading: boolean;

  constructor(private applicantService: ApplicantService, private alertService: AlertService, private modalService: NgbModal) { }

  ngOnInit() {
     this.loading = true;
     this.getApplicants();
  }

  getApplicants() {
      this.loading = true;
      this.applicantService.get().subscribe(
      data => {
        this.loading = false;
        console.log('Applicants Loaded');
        this.applicants = data;
        console.log(this.applicants);
      },
      error => {
        console.log('Error');
        this.loading = false;
      });
    }

  refresh() {
    this.getApplicants();
  }

  openCard(applicant) {
    const modalRef = this.modalService.open(GuestcardComponent, { windowClass: 'dark-modal' });
    modalRef.componentInstance.name = applicant.ApplicantName;
    modalRef.componentInstance.phone = applicant.phone;
    modalRef.componentInstance.moveinDate = applicant.ProofedDate;
  }

  newApplicant() {
    const modalRef = this.modalService.open(ApproveformComponent);
  }

  // For sort event./
  onSorted($event) {
    this.applicants = this.applicantService.sortApplicants(this.applicants, $event);
  }

}
