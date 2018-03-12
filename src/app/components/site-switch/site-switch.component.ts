import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Site } from '../../models/site';
import { User } from '../../models/User';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-switch',
  templateUrl: './site-switch.component.html',
  styleUrls: ['./site-switch.component.scss']
})
export class SiteSwitchComponent implements OnInit {

  public sites: Site[];
  public currentUser: User;
  public currentSite: Site;
  public loading: boolean;

  constructor(private siteService: SiteService, private session: SessionService, private router: Router) { }

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
    this.loading = true;
    this.siteService.getRentalSite(site.id).subscribe(site => {
      this.siteService.setCurrentSite(site);
      this.router.navigate(['dashboard']);
      this.loading = false;
    });
  }  
}
