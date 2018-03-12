import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SiteService } from '../../../services/site.service';
import { Building } from '../../../models/building';
import { Site } from '../../../models/site';

@Component({
  selector: 'app-report-nav',
  templateUrl: './report-nav.component.html',
  styleUrls: ['./report-nav.component.scss']
})
export class ReportNavComponent implements OnInit {

  public buildings: Building[];
  public currentSite: Site;

  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
      this.getRentalBuildings(site.id);

      this.currentSite = site;
    });
  }

  getRentalBuildings(siteId: number) {
    this.siteService.getBuildings(siteId).subscribe(buildings => {
      this.buildings = buildings;
    });
  }
}
