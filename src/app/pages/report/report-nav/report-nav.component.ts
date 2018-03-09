import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SiteService } from '../../../services/site.service';
import { Building } from '../../../models/building';

@Component({
  selector: 'app-report-nav',
  templateUrl: './report-nav.component.html',
  styleUrls: ['./report-nav.component.scss']
})
export class ReportNavComponent implements OnInit {

  public buildings: Building[];

  constructor(private siteService: SiteService) { }

  @Output()
  navEvent: EventEmitter<number> = new EventEmitter<number>();
  // When a user clicks an item in the nav, output the report ID to the parent.
  // Output: The Id of the report that should be opened.

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
      this.getRentalBuildings(site.id);
    });
  }

  getRentalBuildings(siteId: number) {
    this.siteService.getBuildings(siteId).subscribe(buildings => {
      this.buildings = buildings;
    });
  }

  openReport(reportId: number) {
    this.navEvent.emit(reportId);
  }

}
