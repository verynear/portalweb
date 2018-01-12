import { Component, OnInit } from '@angular/core';
import { Applicant } from '../../models/applicant';
import { ApplicantService } from '../../services/applicant.service';
import { DataTableModule } from 'primeng/primeng';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

    displayDialog: boolean;
    applicant: Applicant = new Applicant();
    selectedApplicant: Applicant;
    newApplicant: boolean;
    applicants: Applicant[];
    message: string;
    errorMessage: string;

    constructor(private applicantService: ApplicantService) { }

    ngOnInit() {
        this.getApplicants();
    }

    getApplicants() {
      this.applicantService.get().subscribe(
      data => {
        console.log('Youve received messages');
        this.applicants = data;
        console.log(data[0].lastname);
      },
      error => {
        console.log('Error');
      });
    }

    showDialogToAdd() {
        this.newApplicant = true;
        this.applicant = new Applicant();
        this.displayDialog = true;
    }

    approve(id: number) {
        const applicants = [...this.applicants];
        applicants[this.findSelectedApplicantIndex()] = this.applicant;
        if (this.newApplicant) {
            this.applicantService.create(this.applicant)
              .subscribe(
                data => {
                  this.message = 'Applicant Created';
                  this.applicantService.approve(data['id'])
                      .subscribe(
                         data1 => {
                           this.message = 'Applicant Approved';
                       },
                         (res: HttpErrorResponse) => {
                            this.errorMessage = 'Unable to approve applicant';
                       });
                       },
                          (res: HttpErrorResponse) => {
                             this.errorMessage = 'Unable to create new applicant';
                       });
         } else {
            this.applicantService.approve(this.applicant.id)
                .subscribe(
                    data => {
                      this.message = 'Applicant Approved';
                      this.getApplicants();
                },
                (res: HttpErrorResponse) => {
                  this.errorMessage = 'Unable to create new applicant';
                });
         }
        this.displayDialog = false;
    }

    save() {
        const applicants = [...this.applicants];
        if (this.newApplicant) {
            applicants.push(this.applicant);
            this.applicantService.create(this.applicant)
               .subscribe(
                  data => {
                     this.message = 'Applicant Created';
                     this.getApplicants();
        },
        (res: HttpErrorResponse) => {
          this.errorMessage = 'Unable to create new applicant';
        });
        } else {
            applicants[this.findSelectedApplicantIndex()] = this.applicant;
        }
        this.applicants = applicants;
        this.applicant = null;
        this.displayDialog = false;
    }

    delete() {
        const index = this.findSelectedApplicantIndex();
        this.applicants = this.applicants.filter((val, i) => i !== index);
        this.applicant = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newApplicant = false;
        this.applicant = this.cloneApplicant(event.data);
        this.displayDialog = true;
    }

    cloneApplicant(a: Applicant): Applicant {
        const applicant = new Applicant();
        for (const prop in a) {
            if (applicant[prop] = a[prop]) {
            }
        }
        return applicant;
    }

    findSelectedApplicantIndex(): number {
        return this.applicants.indexOf(this.selectedApplicant);
    }
}
