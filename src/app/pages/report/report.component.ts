import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Site } from '../../models/site';
import { Building } from '../../models/building';
import { Message } from '../../models/message';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public currentSite: Site;
  public sites: Site[];
  public buildings: Building[];
  public messages: Message[];
  public message: Message;

  public id: Number;
  public reportExists: boolean;
  public loading: boolean;
  public report: any[]; // TODO: Create Report Model.


  constructor(private siteService: SiteService, private messageService: MessageService,
    private router: Router, private route: ActivatedRoute, private alertService: AlertService) {

      this.route.params.subscribe(params => {
       this.id = params.id;
      });
  }

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;

      this.getRentalBuildings(site.id);
      this.getMessageReport(this.id);
      this.getMessage(this.id);

    });
  }

  getRentalSites() {
    this.siteService.getRentalSites().subscribe(sites => {
      this.sites = sites;
    });
  }

  getRentalBuildings(currSiteId: number) {
    this.siteService.getBuildings(currSiteId).subscribe(buildings => {
      this.buildings = buildings;
    });
  }

  getMessage(id) {
    this.loading = true;
    this.messageService.get(id).subscribe(
      data => {
        this.loading = false;
        this.message = data;
      },
      error => {
        this.loading = false;
        this.alertService.error('Error Getting Message');
      });
  }

  getMessageReport(id) {
    this.loading = true;
    this.messageService.getReport(id).subscribe(
      data => {
        this.loading = false;
        this.reportExists = true;
        this.report = data;
      },
      error => {
        this.loading = false;
        this.alertService.error('Error Getting Report');
      });
  }

}


