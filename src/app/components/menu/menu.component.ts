import { Component, OnInit } from '@angular/core';
import { Site } from '../../models/site';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public currentUser: User;
  public sites: Site[];
  public multiSite: boolean;
  private currentSite: Site;

  constructor(private session: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private siteService: SiteService) {
              }

  ngOnInit() {
    this.currentUser = this.session.get('currentUser');

    this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;
    });

    this.getSites();
  }

  getSites() {
    this.siteService.getRentalSites().subscribe(site => {
      this.sites = site;
    });
  }

  switchSite(site: Site) {
    this.siteService.setCurrentSite(site);
  }
}
