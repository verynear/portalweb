import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SiteService } from '../../../services/site.service';
import { Building } from '../../../models/building';
import { Site } from '../../../models/site';

@Component({
  selector: 'app-report-nav',
  templateUrl: './report-nav.component.html',
  styleUrls: ['./report-nav.component.scss']
})
export class ReportNavComponent implements OnInit {

  public buildings: any[];
  public currentSite: Site;

  constructor(private siteService: SiteService, private router: Router) { }

  @Input() selected: any;   // Either a Community or a Building.

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
      this.getRentalBuildings(site.id);
      this.currentSite = site;
    });
  }

  getRentalBuildings(siteId: number) {
    this.siteService.getBuildings(siteId).subscribe(buildings => {
      this.buildings = buildings;
      this.buildings.unshift({address1: 'Community'});  // A little hack, but the select box must read the same type.
    });
  }

  openBuildingReport(buildingId: number) {
    this.router.navigate(['report/building-report', buildingId]);
  }

  openCommunityReport() {
    this.router.navigate(['report/community-report', this.currentSite.id]);
  }

  matchSelected() {
    for (let i = 0; i < this.buildings.length; i++) {
      if (this.buildings[i].address1 === this.selected.address1) {
        return i;
      }
    }
  }

  getSelected() {
    if (this.selected === 'Community') {
      return this.buildings[0];
    } else {
      return this.buildings[this.matchSelected()];
    }
  }

  selectReport(reportType: any) {
    if (reportType.address1 === 'Community') {
      this.openCommunityReport();
    } else {
      this.openBuildingReport(reportType.id);
    }
  }
}
