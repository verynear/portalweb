import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';
import { AsyncPipe } from '@angular/common';
import { RentalSite } from '../../models/rental-site';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public logoUrl: string;
    public isCollapsed = true;
    public currentSite: Site;
    public rentalSiteBrandings: RentalSite;

    constructor(private siteService: SiteService) {
    }

    ngOnInit() {
      this.siteService.getCurrentSite().subscribe(site => {
        this.currentSite = site;

        if (site.rentalSitesBrandings != null) {
          this.rentalSiteBrandings = site.rentalSitesBrandings[0];
        }

      });
    }
}
