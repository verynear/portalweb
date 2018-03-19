import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../services/site.service';
import { ReportService } from '../../../services/report.service';
import { Building } from '../../../models/building';
import { Site } from '../../../models/site';
import { Router } from '@angular/router';
import { Attachment } from '../../../models/attachment';

@Component({
  selector: 'app-community-report',
  templateUrl: './community-report.component.html',
  styleUrls: ['./community-report.component.scss']
})
export class CommunityReportComponent implements OnInit {
  public buildings: Building[];
  public currentProperty: Building;
  public siteReport: any[];
  public buildingReport: any[];
  public loading: boolean;
  public currentSite: Site;

  constructor(private siteService: SiteService, private reportService: ReportService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.siteService.getCurrentSite().subscribe(site => {

      this.currentSite = site;

      this.reportService.siteReport(site.id).subscribe(report => {
        this.buildingReport = report;
        this.loading = false;

        this.testAttachmentReport();
      });
    });
  }

  openMessageReport(messageId: number) {
    this.router.navigate(['/report/message-report', messageId]);
  }

  // Build Test Data for Message Attachment
  testAttachmentReport() {
    const message = this.buildingReport[0].buildingUnit[0].tenants[0].messages[0];

    message.attachment = new Array();
    message.attachment[0] = new Attachment();
    message.attachment[1] = new Attachment();
    message.attachment[2] = new Attachment();

    message.attachment[0].fileName = 'myNewAwesomeFile.png';
    message.attachment[0].url = 'http://www.google.com/';
    message.attachment[0].createDate = message.createDate;
    message.attachment[0].updateDate = message.createDate;

    message.attachment[1].fileName = 'someOtherFile.png';
    message.attachment[1].url = 'http://www.google.com/';
    message.attachment[1].createDate = message.createDate;
    message.attachment[1].updateDate = message.createDate;

    message.attachment[2].fileName = 'andAnotherFile.png';
    message.attachment[2].url = 'http://www.google.com/';
    message.attachment[2].createDate = message.createDate;
    message.attachment[2].updateDate = message.createDate;
  }

}
