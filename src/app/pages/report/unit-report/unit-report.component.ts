import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../services/site.service';
import { ReportService } from '../../../services/report.service';
import { Building } from '../../../models/building';
import { Report } from '../../../models/report';
import { Router, ActivatedRoute } from '@angular/router';
import { Site } from '../../../models/site';

@Component({
  selector: 'app-unit-report',
  templateUrl: './unit-report.component.html',
  styleUrls: ['./unit-report.component.scss']
})
export class UnitReportComponent implements OnInit {
  public loading: boolean;
  public report: Report;
  public currentSite: Site;

  constructor(private siteService: SiteService, private router: Router,
    private reportService: ReportService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => { // On init, get the correct building report by URL id.
      const unitId = params.id;
      this.getUnitReport(unitId);
    });

    this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;
    });
  }

  getUnitReport(unitId) {
    this.loading = true;
    this.reportService.unitReport(unitId).subscribe(
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

  openMessageReport(messageId) {
    this.router.navigate(['/report/message-report', messageId]);
  }
}
