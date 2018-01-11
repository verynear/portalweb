import { Component, OnInit } from '@angular/core';
import { Applicant } from '../../models/applicant';
import { ApplicantService } from '../../services/applicant.service';
import { DataTableModule } from 'primeng/primeng';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

    displayDialog: boolean;
    applicant: Applicant = new PrimeApplicant();
    selectedApplicant: Applicant;
    newApplicant: boolean;
    applicants: Applicant[];

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
        this.applicant = new PrimeApplicant();
        this.displayDialog = true;
    }

    approve() {
        const applicants = [...this.applicants];
        applicants[this.findSelectedApplicantIndex()] = this.applicant;
        this.applicantService.approve(this.applicant.id);
        console.log(this.applicant);
        this.displayDialog = false;
    }

    save() {
        const applicants = [...this.applicants];
        if (this.newApplicant) {
            applicants.push(this.applicant);
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
        const applicant = new PrimeApplicant();
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

export class PrimeApplicant implements Applicant {

    constructor(public id?, public emailAddress?, public firstname?, public lastname?, public status?, public phone?) {}
}
