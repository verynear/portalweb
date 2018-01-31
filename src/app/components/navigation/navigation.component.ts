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
    public isCollapsed = true;
    constructor(private siteService: SiteService) {
      siteService.onSwitch$.subscribe(sent => {
      this.onSiteSwitch();
    });

    }

    ngOnInit() {
      setTimeout(() => {
      this.currentSite = this.siteService.currentSite;
      console.log('nav current site');
      console.log(this.currentSite);
      if (this.currentSite.rentalSitesBrandings[0]) {
        this.logoUrl = this.currentSite.rentalSitesBrandings[0].logoUrl;
      } else {
        this.logoUrl = 'assets/backuplogo.png';
      }}, 500);
    }

    onSiteSwitch() {
      setTimeout(() => {
        this.currentSite = this.siteService.currentSite;
        console.log('nav current site');
        console.log(this.currentSite);
        if (this.currentSite.rentalSitesBrandings[0]) {
          this.logoUrl = this.currentSite.rentalSitesBrandings[0].logoUrl;
        } else {
          this.logoUrl = 'assets/backuplogo.png';
        }}, 500);
    }

}
