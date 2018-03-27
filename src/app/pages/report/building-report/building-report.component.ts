import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../services/site.service';
import { ReportService } from '../../../services/report.service';
import { Building } from '../../../models/building';
import { Report } from '../../../models/report';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-building-report',
  templateUrl: './building-report.component.html',
  styleUrls: ['./building-report.component.scss']
})
export class BuildingReportComponent implements OnInit {
  public buildings: Building[];
  public currentProperty: Building;
  public buildingReport: Report[];

  public loading: boolean;

  constructor(private siteService: SiteService, private router: Router,
    private reportService: ReportService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => { // On init, get the correct building report by URL id.
      const buildingId = params.id;
      this.getBuildingReport(buildingId);
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

  getBuildingReport(buildingId: number) {
    this.loading = true;
    this.reportService.buildingReport(buildingId).subscribe(
      data => {
        this.loading = false;
        this.buildingReport = data;
      },
      error => {
        this.loading = false;
      });
  }

  openMessageReport(messageId: number) {
    this.router.navigate(['/report/message-report', messageId]);
  }

  openResidentReport(residentId: number) {
    this.router.navigate(['/report/resident-report', residentId]);
  }

  openUnitReport(unitId: number) {
    this.router.navigate(['/report/unit-report', unitId]);
  }

}
