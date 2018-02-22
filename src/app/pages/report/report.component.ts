import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { MessageService } from '../../services/message.service';

import { User } from '../../models/user';
import { Site } from '../../models/site';
import { Building } from '../../models/building';
import { Message } from '../../models/message';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public currentSite: Site;
  public sites: Site[];
  public buildings: Building[];
  public messages: Message[];

  constructor(private siteService: SiteService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.siteService.getCurrentSite().subscribe(site => {
      this.currentSite = site;
      this.getRentalBuildings(site.id);

      this.getMessages();
    });
  }

  getRentalSites() {
    this.siteService.getRentalSites().subscribe(sites => {
      this.sites = sites;
    });
  }

  getRentalBuildings(currSiteId: number) {
    this.siteService.getBuildings(currSiteId).subscribe(buildings => {
      this.buildings = buildings;
    });
  }

  getMessages() {
    const page = 1;
    const size = 10;

    this.messageService.getSent(page, size).subscribe(messages => {
      console.log('Messages...');
      this.messages = messages['messages'];
      console.log(this.messages);
    });

  }

}


