import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SiteService } from '../../../services/site.service';
import { MessageService } from '../../../services/message.service';
import { ReportService } from '../../../services/report.service';
import { AlertService } from '../../../services/alert.service';

import { User } from '../../../models/user';
import { Site } from '../../../models/site';
import { Building } from '../../../models/building';
import { Message } from '../../../models/message';
import { Report } from '../../../models/report';

@Component({
  selector: 'app-report',
  templateUrl: './message-report.component.html',
  styleUrls: ['./message-report.component.scss']
})
export class MessageReportComponent implements OnInit {
  public currentSite: Site;
  public messages: Message[];
  public message: Message;
  public report: Report[];

  public id: number;
  public reportExists: boolean;
  public loading: boolean;

  constructor(private siteService: SiteService, private messageService: MessageService,
    private router: Router, private route: ActivatedRoute, private alertService: AlertService, private reportService: ReportService) {

      this.route.params.subscribe(params => {
       this.id = params.id;
      });
  }

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;

      this.getMessageReport(this.id);
      this.getMessage(this.id);
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
      });
  }

  getMessageReport(id) {
    this.loading = true;
    this.reportService.messageReport(id).subscribe(
      data => {
        this.loading = false;
        this.reportExists = true;
        this.report = data;
      },
      error => {
        this.loading = false;
      });
  }

  goToCommunityReport() {
    this.router.navigate(['/report/community-report', this.currentSite.id]);
  }
}


