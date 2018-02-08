import { Component, OnInit } from '@angular/core';
import { Applicant } from '../../models/applicant';
import { ApplicantService } from '../../services/applicant.service';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { SessionService } from '../../services/session.service';
import { Site } from '../../models/site';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {

  site: Site;

  constructor(private session: SessionService) {

  }

  ngOnInit() {
    this.session.getObservable('currentSite').subscribe(user => {
      this.site = user;
    });

  }

}
