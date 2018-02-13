import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public logoUrl: string;
    public isCollapsed = true;
    public currentSite: Site;

    constructor(private sessionService: SessionService, private siteService: SiteService) {
    }

    ngOnInit() {
      this.siteService.getCurrentSite().subscribe(site => {
        this.currentSite = site;
      });
    }
}
