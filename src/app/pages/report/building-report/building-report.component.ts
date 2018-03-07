import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../services/site.service';
import { ReportService } from '../../../services/report.service';
import { Building } from '../../../models/building';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building-report',
  templateUrl: './building-report.component.html',
  styleUrls: ['./building-report.component.scss']
})
export class BuildingReportComponent implements OnInit {

  public buildings: Building[];
  public siteReport: any[];
  public buildingReport: any[];
  public loading: boolean;
  public currentProperty: Building;

  constructor(private siteService: SiteService, private router: Router, private reportService: ReportService) { }

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
      this.default(site.id);
    });
  }

  // Init the report for first building by default.  Eventually, this will be refactored in Community.
  default(siteId: number) {
    this.siteService.getBuildings(siteId).subscribe(buildings => {
      this.buildings = buildings;
      this.openBuildingReport(buildings[0].id);
    });
  }

  getRentalBuildings(siteId: number) {
    this.siteService.getBuildings(siteId).subscribe(buildings => {
      this.buildings = buildings;
    });
  }

  openBuildingReport(buildingId: number) {
    this.router.navigate(['/building-report', buildingId]);
    this.getBuildingReport(buildingId);
  }

  openMessageReport(messageId: number) {
    this.router.navigate(['/report', messageId]);
  }

  getSiteReport(siteId: number) {
    this.loading = true;
    this.reportService.siteReport(siteId).subscribe(
      data => {
        this.loading = false;
        this.siteReport = data;
      },
      error => {
        this.loading = false;
      });
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

}
