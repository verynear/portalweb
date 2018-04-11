import { Component, OnInit } from '@angular/core';
import { Applicant } from '../../models/applicant';
import { ApplicantService } from '../../services/applicant.service';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {

  currentSite: Site;

  constructor(private siteService: SiteService) {

  }

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
          this.currentSite = site;
        });

  }

}
