import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../services/site.service';
import { ReportService } from '../../../services/report.service';
import { Building } from '../../../models/building';
import { Report } from '../../../models/report';
import { Router, ActivatedRoute } from '@angular/router';
import { Site } from '../../../models/site';

@Component({
  selector: 'app-resident-report',
  templateUrl: './resident-report.component.html',
  styleUrls: ['./resident-report.component.scss']
})
export class ResidentReportComponent implements OnInit {
  public loading: boolean;
  public report: Report;
  public currentSite: Site;

  constructor(private siteService: SiteService, private router: Router,
    private reportService: ReportService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => { // On init, get the correct building report by URL id.
      const residentId = params.id;
      this.getResidentReport(residentId);
    });

    this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;
    });
  }

  getResidentReport(residentId) {
    this.loading = true;
    this.reportService.residentReport(residentId).subscribe(
      data => {
        this.report = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
  }

  showAttachments(message) {
    if (message.showAttachments == null) {  /* For the case when it's not init'd */
      message.showAttachments = true;
    } else {
      message.showAttachments = !message.showAttachments;
    }
  }

  rowSize($event, message) {
    message.rowSize = $event;
  }

  openCommunityReport() {
    this.router.navigate(['/report/community-report', this.currentSite.id]);
  }

  openMessageReport(messageId: number) {
    this.router.navigate(['/report/message-report', messageId]);
  }
}
