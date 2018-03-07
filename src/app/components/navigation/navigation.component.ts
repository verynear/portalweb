import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Site, SiteBranding } from '../../models/site';
import { AsyncPipe } from '@angular/common';
import { Building } from '../../models/building';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public logoUrl: string;
    public isCollapsed = true;
    public currentSite: Site;
    public rentalSiteBrandings: SiteBranding;
    public initReportId: number;

    constructor(private siteService: SiteService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.siteService.getCurrentSite().subscribe(site => {
        this.currentSite = site;

        if (site.rentalSitesBrandings != null) {
          this.rentalSiteBrandings = site.rentalSitesBrandings[0];
        }

        this.getRentalBuildings(site.id); // Get Rental Buildings so that the navigation links to the first rental building.

      });
    }

    getRentalBuildings(siteId: number) {
      this.siteService.getBuildings(siteId).subscribe(buildings => {
        this.initReportId = buildings[0].id;
      });
    }

    goToReport() {
        this.router.navigate(['/building-report', this.initReportId]);
    }

}
