import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public site: Site;
    public currentSiteId: number;
    public isCollapsed = true;
    public logoUrl: string;
    constructor(private siteService: SiteService) {

    }

    ngOnInit() {
        const currentSiteId = Number (localStorage.getItem('currentSiteId'));

        this.siteService.getRentalSite(currentSiteId)
      .then((site: Site) => this.site = site);

    }

}
