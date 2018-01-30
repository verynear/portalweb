import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    public site: any = {};
    public logoUrl: string;
    public currentSite: any = {};
    public currentSiteId: number;
    public isCollapsed = true;
    constructor(private siteService: SiteService) {
      siteService.onSwitch$.subscribe(sent => {
      this.onSiteSwitch();
    });

    }

    ngOnInit() {
        this.currentSite = this.siteService.getCurrentSite();
        if (this.currentSite.rentalSitesBrandings[0]) {
          this.logoUrl = this.site.rentalSitesBrandings[0].logoUrl;
        } else {
          this.logoUrl = 'assets/backuplogo.png';
        }
    }

    onSiteSwitch() {
      setTimeout(() => {
        this.currentSite = this.siteService.getCurrentSite();
        if (this.currentSite.rentalSitesBrandings[0]) {
          this.logoUrl = this.site.rentalSitesBrandings[0].logoUrl;
        } else {
          this.logoUrl = 'assets/backuplogo.png';
        }, 500);
    }

}
