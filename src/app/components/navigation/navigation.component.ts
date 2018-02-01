import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { SessionService } from '../../services/session.service';
import { Site } from '../../models/site';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public sites: any = {};
    public logoUrl: string;
    public isCollapsed = true;
    public currentSite: Site;

    constructor(
      private siteService: SiteService,
      private sessionService: SessionService) {
    }

    ngOnInit() {
      this.getRentalSites();
      this.currentSite = this.siteService.currentSite;
    }

    getRentalSites() {
      this.siteService.getRentalSites().subscribe((sites: Site[]) => {
        this.sites = sites;
      });
    }
}
