import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../services/site.service';
import { ReportService } from '../../../services/report.service';
import { Building } from '../../../models/building';
import { Site } from '../../../models/site';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-report',
  templateUrl: './community-report.component.html',
  styleUrls: ['./community-report.component.scss']
})
export class CommunityReportComponent implements OnInit {
  public buildings: Building[];
  public currentProperty: Building;
  public siteReport: any[];
  public buildingReport: any[];
  public loading: boolean;
  public currentSite: Site;

  constructor(private siteService: SiteService, private reportService: ReportService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.siteService.getCurrentSite().subscribe(site => {

      this.currentSite = site;

      this.reportService.siteReport(site.id).subscribe(report => {
        this.buildingReport = report;
        this.loading = false;
      });
    });
  }

  openMessageReport(messageId: number) {
    this.router.navigate(['/report/message-report', messageId]);
  }

}
