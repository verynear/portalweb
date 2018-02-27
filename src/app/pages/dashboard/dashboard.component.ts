import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Site } from '../../models/site';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ComposeComponent } from '../../components/compose/compose.component';
import { MostrecentComponent } from '../../components/mostrecent/mostrecent.component';
import { AnnouncementcomposeComponent } from '../../components/announcementcompose/announcementcompose.component';


import { AlertService } from '../../services/alert.service';
import { SessionService } from '../../services/session.service';
import { SiteService } from '../../services/site.service';

@Component({
  moduleId: module.id.toString(),
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public currentUser: User;
  public currentSite: Site;
  public sites: any = [];
  public site: Site;

  constructor(private session: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private alertService: AlertService,
              private siteService: SiteService) {
  }

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;
    });

    this.session.getObservable('currentUser').subscribe(user => {
      this.currentUser = user;
    });
 }

 compose() {
    const modalRef = this.modalService.open(ComposeComponent, { size: 'lg' });
  }

 composeAnnouncement() {
    const options: NgbModalOptions = {backdrop: 'static', size: 'lg'};
    const modalRef = this.modalService.open(AnnouncementcomposeComponent, options);
  }
}

