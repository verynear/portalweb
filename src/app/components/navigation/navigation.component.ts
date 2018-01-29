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
    public currentSiteId: number;
    public isCollapsed = true;
    constructor(private siteService: SiteService) {
      siteService.onSwitch$.subscribe(sent => {
      this.onSiteSwitch();
    });

    }

    ngOnInit() {
        this.currentSiteId = Number (localStorage.getItem('currentSiteId'));

        this.siteService.getRentalSite(this.currentSiteId).subscribe(
          data => {
            this.site = data;
            if (this.site.rentalSitesBrandings[0]) {
              this.logoUrl = this.site.rentalSitesBrandings[0].logoUrl;
            } else {
              this.logoUrl = 'assets/backuplogo.png';
            }
          },
          error => {
            console.log('Error Retriving Site Branding');
          });

    }

    onSiteSwitch() {
      setTimeout(() => {
        this.currentSiteId = Number (localStorage.getItem('currentSiteId'));
        this.siteService.getRentalSite(this.currentSiteId).subscribe(
        data => {
          this.site = data;
          if (this.site.rentalSitesBrandings[0]) {
            this.logoUrl = this.site.rentalSitesBrandings[0].logoUrl;
          } else {
            this.logoUrl = 'assets/backuplogo.png';
          }
        },
        error => {
          console.log('Error Retriving Site Branding');
        }); }, 500);
    }

}
