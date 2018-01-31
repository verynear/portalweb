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
    constructor(private siteService: SiteService, private sessionService: SessionService) {
    }

    ngOnInit() {
      this.sessionService.getObservable('sites')
      .subscribe((sites: Site[]) => {
        console.log('Getting Current Sites In Nav');
        this.sites = sites;
      });
    }

}
