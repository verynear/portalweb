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

  rowSize($event, message) {
    message.rowSize = $event;
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
    message.attachment[3] = new Attachment();
    message.attachment[4] = new Attachment();
    message.attachment[5] = new Attachment();

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

    message.attachment[3].fileName = 'andAnotherFile.png';
    message.attachment[3].url = 'http://www.google.com/';
    message.attachment[3].createDate = message.createDate;
    message.attachment[3].updateDate = message.createDate;

    message.attachment[4].fileName = 'myfavoritefile.png';
    message.attachment[4].url = 'http://www.google.com/';
    message.attachment[4].createDate = message.createDate;
    message.attachment[4].updateDate = message.createDate;

    message.attachment[5].fileName = 'someotherfile.png';
    message.attachment[5].url = 'http://www.google.com/';
    message.attachment[5].createDate = message.createDate;
    message.attachment[5].updateDate = message.createDate;

    ///

    const message2 = this.buildingReport[1].buildingUnit[0].tenants[0].messages[0];

    message2.attachment = new Array();
    message2.attachment[0] = new Attachment();
    message2.attachment[1] = new Attachment();
    message2.attachment[2] = new Attachment();
    message2.attachment[3] = new Attachment();
    message2.attachment[4] = new Attachment();
    message2.attachment[5] = new Attachment();
    message2.attachment[6] = new Attachment();
    message2.attachment[7] = new Attachment();
    message2.attachment[8] = new Attachment();
    message2.attachment[9] = new Attachment();
    message2.attachment[10] = new Attachment();
    message2.attachment[11] = new Attachment();
    message2.attachment[12] = new Attachment();
    message2.attachment[13] = new Attachment();
    message2.attachment[14] = new Attachment();

    message2.attachment[0].fileName = 'myNewAwesomeFile.png';
    message2.attachment[0].url = 'http://www.google.com/';
    message2.attachment[0].createDate = message.createDate;
    message2.attachment[0].updateDate = message.createDate;

    message2.attachment[1].fileName = 'someOtherFile.png';
    message2.attachment[1].url = 'http://www.google.com/';
    message2.attachment[1].createDate = message.createDate;
    message2.attachment[1].updateDate = message.createDate;

    message2.attachment[2].fileName = 'andAnotherFile.png';
    message2.attachment[2].url = 'http://www.google.com/';
    message2.attachment[2].createDate = message.createDate;
    message2.attachment[2].updateDate = message.createDate;

    message2.attachment[3].fileName = 'andAnotherFile.png';
    message2.attachment[3].url = 'http://www.google.com/';
    message2.attachment[3].createDate = message.createDate;
    message2.attachment[3].updateDate = message.createDate;

    message2.attachment[4].fileName = 'myfavoritefile.png';
    message2.attachment[4].url = 'http://www.google.com/';
    message2.attachment[4].createDate = message.createDate;
    message2.attachment[4].updateDate = message.createDate;

    message2.attachment[5].fileName = 'someotherfile.png';
    message2.attachment[5].url = 'http://www.google.com/';
    message2.attachment[5].createDate = message.createDate;
    message2.attachment[5].updateDate = message.createDate;

    message2.attachment[6].fileName = 'andAnotherFile.png';
    message2.attachment[6].url = 'http://www.google.com/';
    message2.attachment[6].createDate = message.createDate;
    message2.attachment[6].updateDate = message.createDate;

    message2.attachment[7].fileName = 'andAnotherFile.png';
    message2.attachment[7].url = 'http://www.google.com/';
    message2.attachment[7].createDate = message.createDate;
    message2.attachment[7].updateDate = message.createDate;

    message2.attachment[8].fileName = 'myfavoritefile.png';
    message2.attachment[8].url = 'http://www.google.com/';
    message2.attachment[8].createDate = message.createDate;
    message2.attachment[8].updateDate = message.createDate;

    message2.attachment[9].fileName = 'someotherfile.png';
    message2.attachment[9].url = 'http://www.google.com/';
    message2.attachment[9].createDate = message.createDate;
    message2.attachment[9].updateDate = message.createDate;

    message2.attachment[10].fileName = 'someotherfile.png';
    message2.attachment[10].url = 'http://www.google.com/';
    message2.attachment[10].createDate = message.createDate;
    message2.attachment[10].updateDate = message.createDate;

    message2.attachment[11].fileName = 'someotherfile.png';
    message2.attachment[11].url = 'http://www.google.com/';
    message2.attachment[11].createDate = message.createDate;
    message2.attachment[11].updateDate = message.createDate;

    message2.attachment[12].fileName = 'someotherfile.png';
    message2.attachment[12].url = 'http://www.google.com/';
    message2.attachment[12].createDate = message.createDate;
    message2.attachment[12].updateDate = message.createDate;

    message2.attachment[13].fileName = 'someotherfile.png';
    message2.attachment[13].url = 'http://www.google.com/';
    message2.attachment[13].createDate = message.createDate;
    message2.attachment[13].updateDate = message.createDate;

    message2.attachment[14].fileName = 'someotherfile.png';
    message2.attachment[14].url = 'http://www.google.com/';
    message2.attachment[14].createDate = message.createDate;
    message2.attachment[14].updateDate = message.createDate;
  }
}
