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

    constructor(private siteService: SiteService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.logoUrl = './assets/backuplogo.png';
      this.siteService.getCurrentSite().subscribe(site => {
        this.currentSite = site;

        if (site.rentalSitesBrandings != null) {
          this.rentalSiteBrandings = site.rentalSitesBrandings[0];
          this.logoUrl = this.rentalSiteBrandings.logoUrl;
        }

      });
    }

    goToReport() {
        this.router.navigate(['report/community-report', this.currentSite.id]);
    }

}
